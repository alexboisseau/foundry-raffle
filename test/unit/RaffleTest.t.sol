// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import {Test, Vm, console} from "forge-std/Test.sol";
import {Raffle} from "../../src/Raffle.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";
import {DeployRaffle} from "../../script/DeployRaffle.s.sol";
import {VRFCoordinatorV2Mock} from "@chainlink/contracts/src/v0.8/mocks/VRFCoordinatorV2Mock.sol";

contract RaffleTest is Test {
  event Raffle__EnteredRaffle(address indexed player);

  Raffle public raffle;
  HelperConfig public helperConfig;

  uint256 public constant STARTING_PLAYER_BALANCE = 100 ether;
  address public immutable PLAYER = makeAddr("PLAYER");
  uint256 public enterFee;
  uint256 public raffleIntervalInSeconds;
  address public vrfCoordinatorV2;
  bytes32 public gasLane;
  uint64 public subscriptionId;
  uint32 public callbackGasLimit;

  modifier raffleEntered() {
    vm.prank(PLAYER);
    raffle.enterRaffle{value: enterFee}();
    _;
  }

  modifier timePassed() {
    vm.warp(block.timestamp + raffleIntervalInSeconds + 1);
    vm.roll(block.number + 1);
    _;
  }

  modifier requestSent() {
    vm.recordLogs();
    raffle.performUpkeep("");
    Vm.Log[] memory entries = vm.getRecordedLogs();
    bytes32 requestId = entries[0].topics[2];
    console.log("request Id :", uint256(requestId));

    VRFCoordinatorV2Mock(vrfCoordinatorV2).fulfillRandomWords(
      uint256(requestId),
      address(raffle)
    );
    _;
  }

  function setUp() external {
    DeployRaffle deployRaffle = new DeployRaffle();
    (raffle, helperConfig) = deployRaffle.run();

    deal(PLAYER, STARTING_PLAYER_BALANCE);

    (
      enterFee,
      raffleIntervalInSeconds,
      vrfCoordinatorV2,
      gasLane,
      subscriptionId,
      callbackGasLimit,

    ) = helperConfig.activeNetworkConfig();
  }

  function testRaffleInitializesInOpenState() public view {
    assert(raffle.getRaffleState() == Raffle.RaffleState.OPEN);
  }

  ///////////////////////
  // Raffle__EnterRaffle
  ///////////////////////

  function testEnterRaffleRevertsWhenYouDontSendEnoughEth() public {
    uint256 notEnoughEth = enterFee - 1;
    vm.prank(PLAYER);

    vm.expectRevert(Raffle.Raffle__NotEnoughEthSent.selector);
    raffle.enterRaffle{value: notEnoughEth}();
  }

  function testEnterRaffleRevertsWhenStateIsNotOpen()
    public
    raffleEntered
    timePassed
  {
    raffle.performUpkeep("");

    vm.expectRevert(Raffle.Raffle__NotOpen.selector);
    raffle.enterRaffle{value: enterFee}();
  }

  function testRaffleRecordsPlayerWhenTheyEnter() public {
    vm.prank(PLAYER);

    raffle.enterRaffle{value: enterFee}();

    assert(raffle.getPlayers().length == 1);
    assert(raffle.getPlayers()[0] == PLAYER);
  }

  function testEventIsEmittedWhenPlayerEnters() public {
    vm.prank(PLAYER);
    vm.expectEmit(true, false, false, true, address(raffle));

    emit Raffle__EnteredRaffle(PLAYER);

    raffle.enterRaffle{value: enterFee}();
  }

  ///////////////////////
  // Raffle__CheckUpkeep
  ///////////////////////

  function testCheckUpkeepReturnsFalseWhenNotEnoughTimeHasPassed()
    public
    raffleEntered
  {
    vm.warp(block.timestamp + raffleIntervalInSeconds - 1);
    vm.roll(block.number + 1);
    (bool upkeepNeeded, ) = raffle.checkUpkeep("");

    assert(upkeepNeeded == false);
  }

  function testCheckUpkeepReturnsFalseWhenRaffleIsNotOpen()
    public
    raffleEntered
    timePassed
  {
    raffle.performUpkeep("");

    (bool upkeepNeeded, ) = raffle.checkUpkeep("");

    assert(upkeepNeeded == false);
  }

  function testCheckUpkeepReturnsFalseWhenNotEnoughPlayersHaveEntered() public {
    vm.warp(block.timestamp + raffleIntervalInSeconds + 1);
    vm.roll(block.number + 1);

    (bool upkeepNeeded, ) = raffle.checkUpkeep("");

    assert(upkeepNeeded == false);
  }

  function testUpkeepReturnsTrueWhenParametersAreGood()
    public
    raffleEntered
    timePassed
  {
    (bool upkeepNeeded, ) = raffle.checkUpkeep("");

    assert(upkeepNeeded == true);
  }

  ///////////////////////
  // Raffle__PerformUpkeep
  ///////////////////////

  function testPerformUpkeepRevertsWhenCheckUpkeepReturnsFalse() public {
    uint256 balance = 0;
    uint256 players = 0;
    uint256 state = 0;

    vm.expectRevert(
      abi.encodeWithSelector(
        Raffle.Raffle_UpkeepNotNeeded.selector,
        balance,
        players,
        state
      )
    );
    raffle.performUpkeep("");
  }

  function testPerformUpkeepRunWhenCheckUpkeepReturnsTrue()
    public
    raffleEntered
    timePassed
  {
    raffle.performUpkeep("");
  }

  function testPerformUpkeepEmitEvent() public raffleEntered timePassed {
    vm.recordLogs();
    raffle.performUpkeep("");
    Vm.Log[] memory entries = vm.getRecordedLogs();
    bytes32 requestId = entries[0].topics[1];

    assert(requestId > 0);
  }

  function testPerforumUpkeepUpdateRaffleState()
    public
    raffleEntered
    timePassed
  {
    raffle.performUpkeep("");
    uint256 state = uint256(raffle.getRaffleState());

    assert(state == 1);
  }

  ///////////////////////
  // Raffle__FulfillRandomWords
  ///////////////////////

  function testFullfillRandomWordsCanOnlyBeCalledAfterPerformUpkeep(
    uint256 randomRequestId
  ) public {
    vm.expectRevert("nonexistent request");
    VRFCoordinatorV2Mock(vrfCoordinatorV2).fulfillRandomWords(
      randomRequestId,
      address(raffle)
    );
  }

  function testFullfillRandomWordsResetPlayers()
    public
    raffleEntered
    timePassed
    requestSent
  {
    assert(raffle.getPlayers().length == 0);
  }

  function testFullfillRandomWordsResetState()
    public
    raffleEntered
    timePassed
    requestSent
  {
    assert(uint256(raffle.getRaffleState()) == 0);
  }

  function testFullfillRandomWordsSentPrize() public raffleEntered timePassed {
    uint256 addedPlayers = 5;

    for (uint256 i = 1; i <= addedPlayers; i++) {
      address player = address(uint160(i));
      hoax(player, STARTING_PLAYER_BALANCE); // deal 100 ether to play
      raffle.enterRaffle{value: enterFee}();
    }

    vm.recordLogs();
    raffle.performUpkeep("");
    Vm.Log[] memory entries = vm.getRecordedLogs();
    bytes32 requestId = entries[0].topics[2];

    VRFCoordinatorV2Mock(vrfCoordinatorV2).fulfillRandomWords(
      uint256(requestId),
      address(raffle)
    );

    uint256 prize = enterFee * (addedPlayers + 1);

    assert(
      raffle.getLastWinner().balance ==
        STARTING_PLAYER_BALANCE + prize - enterFee
    );
  }

  function testFullfillRandomWordsUpdatesLastTimestamp()
    public
    raffleEntered
    timePassed
  {
    uint256 lastTimestamp = raffle.getLastRaffleTimestamp();

    vm.recordLogs();
    raffle.performUpkeep("");
    Vm.Log[] memory entries = vm.getRecordedLogs();
    bytes32 requestId = entries[0].topics[2];

    VRFCoordinatorV2Mock(vrfCoordinatorV2).fulfillRandomWords(
      uint256(requestId),
      address(raffle)
    );

    assert(raffle.getLastRaffleTimestamp() > lastTimestamp);
  }
}

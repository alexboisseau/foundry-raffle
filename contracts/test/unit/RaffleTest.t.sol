// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import {Test, Vm, console} from "forge-std/Test.sol";
import {Raffle} from "../../src/Raffle.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";
import {DeployRaffle} from "../../script/DeployRaffle.s.sol";
import {VRFCoordinatorV2Mock} from "@chainlink/contracts/src/v0.8/mocks/VRFCoordinatorV2Mock.sol";

contract RaffleTest is Test {
  event Raffle__EnteredRaffle(
    address indexed player,
    address payable[] players
  );

  Raffle public raffle;
  HelperConfig public helperConfig;

  uint256 public constant STARTING_PLAYER_BALANCE = 100 ether;
  address public immutable PLAYER = makeAddr("PLAYER");
  address public immutable OWNER = DEFAULT_SENDER;
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

  modifier skipFork() {
    if (block.chainid != 31337) {
      return;
    }

    _;
  }

  modifier prank(address from) {
    vm.startPrank(from);
    _;
    vm.stopPrank();
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
      ,

    ) = helperConfig.activeNetworkConfig();
  }

  function testRaffleInitializesInOpenState() public view {
    assert(raffle.getRaffleState() == Raffle.RaffleState.OPEN);
  }

  ///////////////////////
  // Raffle__UpdateRaffleIntervalInSeconds
  ///////////////////////

  function testUpdateRaffleIntervalInSecondsRevertsWhenNotCalledByOwner()
    public
    prank(PLAYER)
  {
    vm.expectRevert(Raffle.Raffle_OnlyOwner.selector);
    raffle.updateRaffleIntervalInSeconds(3600);
  }

  function testUpdateRaffleIntervalInSecondsRevertsWhenIntervalIsLessThanOne()
    public
    prank(OWNER)
  {
    vm.expectRevert(Raffle.Raffle_InvalidIntervalInSeconds.selector);
    raffle.updateRaffleIntervalInSeconds(0);
  }

  function testUpdateRaffleIntervalInSecondsUpdatesRaffleIntervalInSeconds()
    public
    prank(OWNER)
  {
    uint256 newInterval = raffle.getRaffleIntervalInSeconds() + 3600;
    raffle.updateRaffleIntervalInSeconds(newInterval);

    assert(raffle.getRaffleIntervalInSeconds() == newInterval);
  }

  ///////////////////////
  // Raffle__UpdateRaffleEnterFee
  ///////////////////////

  function testUpdateEnterFeeRevertsWhenNotCalledByOwner()
    public
    prank(PLAYER)
  {
    vm.expectRevert(Raffle.Raffle_OnlyOwner.selector);
    raffle.updateEnterFee(0.02 ether);
  }

  function testUpdateEnterFeeRevertsWhenIntervalIsLessThanTheMinimum()
    public
    prank(OWNER)
  {
    vm.expectRevert(Raffle.Raffle_InvalidEnterFee.selector);
    raffle.updateEnterFee(0);
  }

  function testUpdateEnterFeeUpdatesRaffleIntervalInSeconds()
    public
    prank(OWNER)
  {
    uint256 newEnterFee = raffle.getEnterFee() + 0.01 ether;
    raffle.updateEnterFee(newEnterFee);

    assert(raffle.getEnterFee() == newEnterFee);
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
    address payable[] memory players = new address payable[](1);
    players[0] = payable(PLAYER);

    emit Raffle__EnteredRaffle(PLAYER, players);

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
    uint256 balance = address(raffle).balance;
    uint256 players = raffle.getPlayers().length;
    Raffle.RaffleState state = raffle.getRaffleState();

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

  function testPerformUpkeepUpdateLastTimestampWithNoPlayers()
    public
    timePassed
  {
    raffle.performUpkeep("");
    uint256 lastTimestamp = uint256(raffle.getLastRaffleTimestamp());

    assert(lastTimestamp == block.timestamp);
  }

  ///////////////////////
  // Raffle__FulfillRandomWords
  ///////////////////////

  function testFullfillRandomWordsCanOnlyBeCalledAfterPerformUpkeep(
    uint256 randomRequestId
  ) public skipFork {
    vm.expectRevert("nonexistent request");
    VRFCoordinatorV2Mock(vrfCoordinatorV2).fulfillRandomWords(
      randomRequestId,
      address(raffle)
    );
  }

  function testFullfillRandomWordsResetPlayers()
    public
    skipFork
    raffleEntered
    timePassed
    requestSent
  {
    assert(raffle.getPlayers().length == 0);
  }

  function testFullfillRandomWordsResetState()
    public
    skipFork
    raffleEntered
    timePassed
    requestSent
  {
    assert(uint256(raffle.getRaffleState()) == 0);
  }

  function testFullfillRandomWordsSentPrize()
    public
    skipFork
    raffleEntered
    timePassed
  {
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
    skipFork
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

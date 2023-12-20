// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import {Test} from "forge-std/Test.sol";
import {Raffle} from "../../src/Raffle.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";
import {DeployRaffle} from "../../script/DeployRaffle.s.sol";

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

  function testEnterRaffleRevertsWhenStateIsNotOpen() public {
    vm.prank(PLAYER);
    raffle.enterRaffle{value: enterFee}();

    vm.warp(block.timestamp + raffleIntervalInSeconds + 1);
    vm.roll(block.number + 1);
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

  function testCheckUpkeepReturnsFalseWhenNotEnoughTimeHasPassed() public {
    vm.prank(PLAYER);
    raffle.enterRaffle{value: enterFee}();
    vm.warp(block.timestamp + raffleIntervalInSeconds - 1);
    vm.roll(block.number + 1);

    (bool upkeepNeeded, ) = raffle.checkUpkeep("");

    assert(upkeepNeeded == false);
  }

  function testCheckUpkeepReturnsFalseWhenRaffleIsNotOpen() public {
    vm.prank(PLAYER);
    raffle.enterRaffle{value: enterFee}();
    vm.warp(block.timestamp + raffleIntervalInSeconds + 1);
    vm.roll(block.number + 1);
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

  function testUpkeepReturnsTrueWhenParametersAreGood() public {
    vm.warp(block.timestamp + raffleIntervalInSeconds + 1);
    vm.roll(block.number + 1);
    vm.prank(PLAYER);
    raffle.enterRaffle{value: enterFee}();

    (bool upkeepNeeded, ) = raffle.checkUpkeep("");

    assert(upkeepNeeded == true);
  }
}

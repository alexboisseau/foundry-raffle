// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import {VRFCoordinatorV2Interface} from "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import {VRFConsumerBaseV2} from "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";

/**
 * @title Raffle
 * @author Alex Boisseau
 * @notice This contract is used to manage a raffle
 */
contract Raffle is VRFConsumerBaseV2, AutomationCompatibleInterface {
  error Raffle__NotEnoughEthSent();
  error Raffle__NotOpen();
  error Raffle__DistributingEthFailed();
  error Raffle_UpkeepNotNeeded(
    uint256 currentBalance,
    uint256 playersNumber,
    uint256 raffleState
  );

  event Raffle__EnteredRaffle(address indexed player, uint256 players);
  event Raffle__PickedWinner(address indexed winner);

  enum RaffleState {
    OPEN,
    CALCULATING
  }

  uint16 private constant REQUEST_CONFIRMATIONS = 3;
  uint32 private constant NUM_WORDS = 1;

  uint256 private immutable i_enterFee;
  uint256 private immutable i_raffleIntervalInSeconds;
  VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
  bytes32 private immutable i_gasLane;
  uint64 private immutable i_subscriptionId;
  uint32 private immutable i_callbackGasLimit;

  address payable[] private s_players;
  uint256 private s_lastRaffleTimestamp;
  address payable private s_lastWinner;
  RaffleState private s_raffleState;

  constructor(
    uint256 enterFee,
    uint256 raffleIntervalInSeconds,
    address vrfCoordinator,
    bytes32 gasLane,
    uint64 subscriptionId,
    uint32 callbackGasLimit
  ) VRFConsumerBaseV2(vrfCoordinator) {
    i_enterFee = enterFee;
    i_raffleIntervalInSeconds = raffleIntervalInSeconds;
    i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinator);
    i_gasLane = gasLane;
    i_subscriptionId = subscriptionId;
    i_callbackGasLimit = callbackGasLimit;

    s_lastRaffleTimestamp = block.timestamp;
    s_raffleState = RaffleState.OPEN;
  }

  function enterRaffle() external payable {
    if (msg.value < i_enterFee) {
      revert Raffle__NotEnoughEthSent();
    }

    if (s_raffleState != RaffleState.OPEN) {
      revert Raffle__NotOpen();
    }

    address payable player = payable(msg.sender);
    s_players.push(player);

    emit Raffle__EnteredRaffle(player, s_players.length);
  }

  function performUpkeep(bytes calldata /* performData */) external override {
    (bool upkeepNeeded, ) = checkUpkeep("");

    if (upkeepNeeded == false) {
      revert Raffle_UpkeepNotNeeded(
        address(this).balance,
        s_players.length,
        uint256(s_raffleState)
      );
    }

    s_raffleState = RaffleState.CALCULATING;
    sendVrfRequest();
  }

  function checkUpkeep(
    bytes memory /* checkData */
  )
    public
    view
    override
    returns (bool upkeepNeeded, bytes memory /*performData*/)
  {
    upkeepNeeded = winnerCanBePicked();
  }

  function fulfillRandomWords(
    uint256 /* requestId */,
    uint256[] memory randomWords
  ) internal override {
    address payable winner = pickRandomPlayer(randomWords[0]);

    s_raffleState = RaffleState.OPEN;
    s_players = new address payable[](0);
    s_lastRaffleTimestamp = block.timestamp;
    s_lastWinner = winner;

    emit Raffle__PickedWinner(winner);

    (bool success, ) = winner.call{value: address(this).balance}("");
    if (success == false) {
      revert Raffle__DistributingEthFailed();
    }
  }

  function sendVrfRequest() private {
    i_vrfCoordinator.requestRandomWords(
      i_gasLane,
      i_subscriptionId,
      REQUEST_CONFIRMATIONS,
      i_callbackGasLimit,
      NUM_WORDS
    );
  }

  function winnerCanBePicked() private view returns (bool) {
    bool raffleIsOpen = s_raffleState == RaffleState.OPEN;
    bool raffleHasPlayers = s_players.length > 0;
    bool enoughTimePassed = block.timestamp >
      s_lastRaffleTimestamp + i_raffleIntervalInSeconds;

    return enoughTimePassed && raffleIsOpen && raffleHasPlayers;
  }

  function pickRandomPlayer(
    uint256 randomValue
  ) private view returns (address payable randomPlayer) {
    uint256 playerIndex = randomValue % s_players.length;
    randomPlayer = s_players[playerIndex];
  }

  /** GETTERS */

  function getRaffleState() external view returns (RaffleState) {
    return s_raffleState;
  }

  function getPlayers() external view returns (address payable[] memory) {
    return s_players;
  }

  function getLastWinner() external view returns (address payable) {
    return s_lastWinner;
  }

  function getLastRaffleTimestamp() external view returns (uint256) {
    return s_lastRaffleTimestamp;
  }

  function getEnterFee() external view returns (uint256) {
    return i_enterFee;
  }

  function getRaffleIntervalInSeconds() external view returns (uint256) {
    return i_raffleIntervalInSeconds;
  }
}

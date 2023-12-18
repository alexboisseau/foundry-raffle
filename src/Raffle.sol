// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import {VRFCoordinatorV2Interface} from "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import {VRFConsumerBaseV2} from "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

/**
 * @title Raffle
 * @author Alex Boisseau
 * @notice This contract is used to manage a raffle
 */
contract Raffle is VRFConsumerBaseV2 {
  error Raffle__NotEnoughEthSent();
  error Raffle__NotEnoughTimePassed();
  error Raffle__NoPlayers();
  error Raffle__DistributingEthFailed();
  error Raffle__NotOpen();

  event Raffle__EnteredRaffle(address indexed player);

  enum RaffleState {
    OPEN,
    CLOSED,
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
    uint256 _enterFee,
    uint256 raffleIntervalInSeconds,
    address vrfCoordinator,
    bytes32 gasLane,
    uint64 subscriptionId,
    uint32 callbackGasLimit
  ) VRFConsumerBaseV2(vrfCoordinator) {
    i_enterFee = _enterFee;
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

    emit Raffle__EnteredRaffle(player);
  }

  function pickWinner() external returns (address payable) {
    if (enoughTimePassed() == false) {
      revert Raffle__NotEnoughTimePassed();
    }

    s_raffleState = RaffleState.CALCULATING;
    sendVrfRequest();
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

  function fulfillRandomWords(
    uint256 requestId,
    uint256[] memory randomWords
  ) internal override {
    uint256 winnerIndex = randomWords[0] % s_players.length;
    address payable winner = s_players[winnerIndex];

    s_raffleState = RaffleState.OPEN;
    s_players = new address payable[](0);
    s_lastRaffleTimestamp = block.timestamp;
    s_lastWinner = winner;

    (bool success, ) = winner.call{value: address(this).balance}("");
    if (success == false) {
      revert Raffle__DistributingEthFailed();
    }
  }

  function enoughTimePassed() private view returns (bool) {
    return block.timestamp > s_lastRaffleTimestamp + i_raffleIntervalInSeconds;
  }
}

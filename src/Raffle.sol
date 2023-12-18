// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

/**
 * @title Raffle
 * @author Alex Boisseau
 * @notice This contract is used to manage a raffle
 */
contract Raffle {
  error Raffle__NotEnoughEthSent();
  error Raffle__NotEnoughTimePassed();
  error Raffle__NoPlayers();

  event Raffle__EnteredRaffle(address indexed player);

  uint256 private immutable i_enterFee;
  uint256 private immutable i_raffleIntervalInSeconds;

  address payable[] private s_players;
  uint256 private s_lastRaffleTimestamp;

  constructor(uint256 _enterFee, uint256 raffleIntervalInSeconds) {
    i_enterFee = _enterFee;
    i_raffleIntervalInSeconds = raffleIntervalInSeconds;
    s_lastRaffleTimestamp = block.timestamp;
  }

  function enterRaffle() external payable {
    if (msg.value < i_enterFee) {
      revert Raffle__NotEnoughEthSent();
    }

    address payable player = payable(msg.sender);
    s_players.push(player);

    emit Raffle__EnteredRaffle(player);
  }

  function pickWinner() external returns (address payable) {
    if (enoughTimePassed() == false) {
      revert Raffle__NotEnoughTimePassed();
    }
  }

  function enoughTimePassed() private view returns (bool) {
    return block.timestamp > s_lastRaffleTimestamp + i_raffleIntervalInSeconds;
  }
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

/**
 * @title Raffle
 * @author Alex Boisseau
 * @notice This contract is used to manage a raffle
 */
contract Raffle {
  uint256 private immutable i_enterFee;

  error Raffle__NotEnoughEthSent();

  constructor(uint256 _enterFee) {
    i_enterFee = _enterFee;
  }

  function enterRaffle() external payable {
    if (msg.value < i_enterFee) {
      revert Raffle__NotEnoughEthSent();
    }
  }
}

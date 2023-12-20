// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import {Script} from "forge-std/Script.sol";
import {Raffle} from "../src/Raffle.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {CreateVrfSubscription} from "./Interactions.s.sol";

contract DeployRaffle is Script {
  function run() external returns (Raffle, HelperConfig) {
    HelperConfig helperConfig = new HelperConfig();
    (
      uint256 enterFee,
      uint256 raffleIntervalInSeconds,
      address vrfCoordinatorV2,
      bytes32 gasLane,
      uint64 subscriptionId,
      uint32 callbackGasLimit,

    ) = helperConfig.activeNetworkConfig();

    if (subscriptionId == 0) {
      CreateVrfSubscription createVrfSubscription = new CreateVrfSubscription();
      subscriptionId = createVrfSubscription.createVrfSubscription(
        vrfCoordinatorV2
      );
    }

    vm.startBroadcast();

    Raffle raffle = new Raffle(
      enterFee,
      raffleIntervalInSeconds,
      vrfCoordinatorV2,
      gasLane,
      subscriptionId,
      callbackGasLimit
    );

    vm.stopBroadcast();

    return (raffle, helperConfig);
  }
}

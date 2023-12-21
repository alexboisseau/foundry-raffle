// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import {Script} from "forge-std/Script.sol";
import {Raffle} from "../src/Raffle.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {CreateVrfSubscription, AddVrfConsumer, FundVrfSubscription} from "./Interactions.s.sol";

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
      address linkToken,
      uint256 deployerKey
    ) = helperConfig.activeNetworkConfig();

    // If subscriptionId is 0, we're on Anvil Network and need to create a subscription
    if (subscriptionId == 0) {
      CreateVrfSubscription createVrfSubscription = new CreateVrfSubscription();
      subscriptionId = createVrfSubscription.createVrfSubscription(
        vrfCoordinatorV2,
        deployerKey
      );

      FundVrfSubscription fundVrfSubscription = new FundVrfSubscription();
      fundVrfSubscription.fundVrfSubscription(
        vrfCoordinatorV2,
        subscriptionId,
        linkToken,
        deployerKey
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

    AddVrfConsumer addVrfConsumer = new AddVrfConsumer();
    addVrfConsumer.addVrfConsumer(
      address(raffle),
      vrfCoordinatorV2,
      subscriptionId,
      deployerKey
    );

    return (raffle, helperConfig);
  }
}

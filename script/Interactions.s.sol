// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import {Script, console} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {VRFCoordinatorV2Mock} from "@chainlink/contracts/src/v0.8/mocks/VRFCoordinatorV2Mock.sol";
import {LinkToken} from "../test/mocks/LinkToken.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

contract CreateVrfSubscription is Script {
  function createVrfSubscription(
    address vrfCoordinator
  ) public returns (uint64) {
    vm.startBroadcast();
    uint64 subscriptionId = VRFCoordinatorV2Mock(vrfCoordinator)
      .createSubscription();
    vm.stopBroadcast();

    return subscriptionId;
  }

  function createSubscriptionVrfUsingConfig() public returns (uint64) {
    HelperConfig helperConfig = new HelperConfig();
    (, , address vrfCoordinatorV2, , , , , ) = helperConfig
      .activeNetworkConfig();
    return createVrfSubscription(vrfCoordinatorV2);
  }

  function run() external returns (uint64) {
    return createSubscriptionVrfUsingConfig();
  }
}

contract FundVrfSubscription is Script {
  uint96 public constant FUND_AMOUNT = 3 ether;

  function fundVrfSubscription(
    address vrfCoordinatorV2,
    uint64 subscriptionId,
    address linkToken
  ) public {
    console.log("subscriptionId : ", subscriptionId);
    console.log("vrfCoordinatorV2 : ", vrfCoordinatorV2);
    console.log("linkToken : ", linkToken);
    console.log("chain id : ", block.chainid);

    if (block.chainid == 31337) {
      vm.startBroadcast();
      VRFCoordinatorV2Mock(vrfCoordinatorV2).fundSubscription(
        subscriptionId,
        FUND_AMOUNT
      );
      vm.stopBroadcast();
    } else {
      vm.startBroadcast();
      LinkToken(linkToken).transferAndCall(
        vrfCoordinatorV2,
        FUND_AMOUNT,
        abi.encode(subscriptionId)
      );
      vm.stopBroadcast();
    }
  }

  function fundVrfSubscriptionUsingConfig() public {
    HelperConfig helperConfig = new HelperConfig();
    (
      ,
      ,
      address vrfCoordinatorV2,
      ,
      uint64 subscriptionId,
      ,
      address linkToken,

    ) = helperConfig.activeNetworkConfig();
    fundVrfSubscription(vrfCoordinatorV2, subscriptionId, linkToken);
  }

  function run() external {
    fundVrfSubscriptionUsingConfig();
  }
}

contract AddVrfConsumer is Script {
  function addVrfConsumer(
    address consumer,
    address vrfCoordinatorV2,
    uint64 subscriptionId
  ) public {
    console.log("consumer : ", consumer);
    console.log("vrfCoordinatorV2 : ", vrfCoordinatorV2);
    console.log("subscriptionId : ", subscriptionId);

    vm.startBroadcast();
    VRFCoordinatorV2Mock(vrfCoordinatorV2).addConsumer(
      subscriptionId,
      consumer
    );
    vm.stopBroadcast();
  }

  function addVrfConsumerUsingConfig(address consumer) public {
    HelperConfig helperConfig = new HelperConfig();
    (, , address vrfCoordinatorV2, , uint64 subscriptionId, , , ) = helperConfig
      .activeNetworkConfig();

    addVrfConsumer(consumer, vrfCoordinatorV2, subscriptionId);
  }

  function run() external {
    address raffle = DevOpsTools.get_most_recent_deployment(
      "Raffle",
      block.chainid
    );

    addVrfConsumerUsingConfig(raffle);
  }
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import {Script} from "forge-std/Script.sol";
import {VRFCoordinatorV2Mock} from "@chainlink/contracts/src/v0.8/mocks/VRFCoordinatorV2Mock.sol";
import {LinkToken} from "../test/mocks/LinkToken.sol";

contract HelperConfig is Script {
  struct NetworkConfig {
    uint256 enterFee;
    uint256 raffleIntervalInSeconds;
    address vrfCoordinator;
    bytes32 gasLane;
    uint64 subscriptionId;
    uint32 callbackGasLimit;
    address linkToken;
    uint256 deployerKey;
  }

  NetworkConfig public activeNetworkConfig;
  uint256 public constant DEFAULT_ANVIL_PRIVATE_KEY =
    0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;

  constructor() {
    if (block.chainid == 11155111) {
      activeNetworkConfig = getSepoliaEthConfig();
    } else {
      activeNetworkConfig = getOrCreateAnvilEthConfig();
    }
  }

  function getSepoliaEthConfig() private view returns (NetworkConfig memory) {
    return
      NetworkConfig({
        enterFee: 0.01 ether,
        raffleIntervalInSeconds: 300,
        vrfCoordinator: 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625,
        gasLane: 0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c,
        subscriptionId: 7907,
        callbackGasLimit: 2500000, // 2 500 000 gas
        linkToken: 0x779877A7B0D9E8603169DdbD7836e478b4624789,
        deployerKey: vm.envUint("SEPOLIA_PRIVATE_KEY")
      });
  }

  function getOrCreateAnvilEthConfig() private returns (NetworkConfig memory) {
    if (activeNetworkConfig.vrfCoordinator != address(0)) {
      return activeNetworkConfig;
    }

    uint96 baseFeeLink = 0.25 ether; // 0.25 LINK
    uint96 gasPriceLink = 1 gwei; // 1 gwei LINK

    vm.startBroadcast();
    VRFCoordinatorV2Mock vrfCoordinatorV2Mock = new VRFCoordinatorV2Mock(
      baseFeeLink,
      gasPriceLink
    );

    LinkToken linkToken = new LinkToken();
    vm.stopBroadcast();

    return
      NetworkConfig({
        enterFee: 0.05 ether,
        raffleIntervalInSeconds: 30,
        vrfCoordinator: address(vrfCoordinatorV2Mock),
        gasLane: 0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c,
        subscriptionId: 0,
        callbackGasLimit: 2500000, // 2 500 000 gas
        linkToken: address(linkToken),
        deployerKey: DEFAULT_ANVIL_PRIVATE_KEY
      });
  }
}

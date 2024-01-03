import { Address } from "viem";
import { foundry, sepolia } from "wagmi/chains";
import { SupportedChainId } from "../components/types/supported-chain-id";

const raffleAddresses: { [key: SupportedChainId]: Address } = {
  [foundry.id]: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
  [sepolia.id]: "0x397872ba49432C9744Dfc62101079cB5401a4F22",
};

const raffleAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "enterFee",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "raffleIntervalInSeconds",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "vrfCoordinator",
        type: "address",
        internalType: "address",
      },
      {
        name: "gasLane",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "subscriptionId",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "callbackGasLimit",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "checkUpkeep",
    inputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "upkeepNeeded",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "enterRaffle",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getEnterFee",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLastRaffleTimestamp",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLastWinner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address payable",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPlayers",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address[]",
        internalType: "address payable[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRaffleIntervalInSeconds",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRaffleState",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint8",
        internalType: "enum Raffle.RaffleState",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "performUpkeep",
    inputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "rawFulfillRandomWords",
    inputs: [
      {
        name: "requestId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "randomWords",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Raffle__EnteredRaffle",
    inputs: [
      {
        name: "player",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Raffle__PickedWinner",
    inputs: [
      {
        name: "winner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "OnlyCoordinatorCanFulfill",
    inputs: [
      {
        name: "have",
        type: "address",
        internalType: "address",
      },
      {
        name: "want",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "Raffle_UpkeepNotNeeded",
    inputs: [
      {
        name: "currentBalance",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "playersNumber",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "raffleState",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "Raffle__DistributingEthFailed",
    inputs: [],
  },
  {
    type: "error",
    name: "Raffle__NotEnoughEthSent",
    inputs: [],
  },
  {
    type: "error",
    name: "Raffle__NotOpen",
    inputs: [],
  },
] as const;

export { raffleAbi, raffleAddresses };

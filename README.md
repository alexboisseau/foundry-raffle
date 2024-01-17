# Decentralized Raffle

## Links

🌐 [Client Application](https://foundry-raffle.vercel.app/)  
📄 [Contract Address](https://sepolia.etherscan.io/address/0x5bCc74831871eA4d7cD504B987dE7d7b677A2df1)

## About

This project has the goal to produce a provably random smart contract raffle. To achieve that, I used decentralized technologies:

- Ethereum blockchain
- Chainlink Oracle

This project stands in the context of [Cyfrin Updraft](https://updraft.cyfrin.io/) blockchain course. I went further than the course, building a client application to interact with the deployed smart contract.

## How it works?

The whole logic of the raffle resides in the `Raffle` smart contract :

- To enter in the raffle, you must sent a minimum value (`enterFee`) and the lottery must be `OPEN`. Once, the player address is store in an array with other players.
- A withdraw happens all the `x` seconds if players array isn't empty. This conditions are verified by the [Chainlink Automation](https://docs.chain.link/chainlink-automation) service which will check them for each block. When these conditions are ok, the contract calls the [Chainlink VRF](https://docs.chain.link/vrf) service which will provide us a random value.
- Then, the random value is used to pick a winner in the array of the players. Next, value of the contract is sent to the winner and players array is cleaned.
- The owner can update the raffle interval (`x`) and the `enterFee`

Thanks to the web application, users can connect their wallet (eg: Metamask) and then interact with the smart contract easier.

## What I've learned?

1. Create a smart contract using Solidity language.
   - How to create custom errors
   - How to create modifiers
   - How to create events
   - Difference between `memory`, `calldata`, `storage` variables
     - `memory`: temporary data (eg: function argument), can be modified
     - `calldata`: temporary data (eg: function argument), cannot be modified
     - `storage`: data which persist during the time inside the contract
     - `memory` and `calldata` must be specified for specific types like `array` or `map` passed though function. Other types (eg: uint, int) are memory by default
   - How to create functions and how to declare their visibilities.
2. Use Foundry framework
   - Install and use libs
   - Write tests
   - Write scripts
   - Use `forge` tool to run tests and scripts / deployed contract / verified contract
3. Chainlink VRF and Automation
   - Configure the Automation, providing :
     - type of automation (`custom` in our case)
     - address of the contract
     - the balance
   - Configure the VRF, providing :
     - consumers (automatic in our case thanks to a script run during the deployment)
     - the balance
4. Use [Wagmi](https://wagmi.sh/) library for the development of the web application

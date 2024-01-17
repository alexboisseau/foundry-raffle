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

1. Raffle Contract 🎟️  
   The whole logic resides in this smart contract. These are the basic rules :

   - The raffle has an `intervalInSeconds`, an `enterFee`, a `state` (OPEN or CALCULATING), an array of `players` address, the `lastWinner` and the `lastWithdrawTimestamp`.
   - A player can buy a ticket if the raffle is OPEN and if the value sent through the tx is greater than the `enterFee`.
   - Owner of the contract can update the `intervalInSeconds` and the `enterFee` properties.

2. ChainLink Automation 🤖  
   Thanks to this service, oracle network looks if a withdraw is needed for each new block. This is possible since our contract implement the `AutomationCompatibleInterface` from `@chainlink`. For each block, the method `checkUpkeep` is called. If this method returns true, then a node call the `performUpkeep` method. It's at this moment that we're going to request a VRF.

3. ChainLink VRF (Verifiable Random Function) 🎲
   Thanks to this service, we can request a random value. This is possible since our contract implement the `VRFConsumerBaseV2` from `@chainlink`. We received the number through the method `fulfillRandomWords`. At this point, we'll select a winner, send him or her the raffle value and clear the players array.

4. Web Application 🌐  
   Through web application, users can connect their wallet (eg: Metamask) and then interact with the smart contract easier to buy a ticket and read some information like the players number, the last winner, etc...

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
2. Use [Foundry](https://book.getfoundry.sh/) framework
   - Install and use libs
   - Write tests
   - Write scripts
   - Use `forge` tool to run tests and scripts / deployed contract / verified contract
   - Use `anvil` to run a local blockchain
3. ChainLink VRF and Automation
   - Configure the Automation, providing :
     - type of automation (`custom` in our case)
     - address of the contract
     - the balance
   - Configure the VRF, providing :
     - consumers (automatic in our case thanks to a script run during the deployment)
     - the balance
4. Use [Wagmi](https://wagmi.sh/) library for the development of the web application
   - Set up the configuration with `chains`, `providers` and `connectors`
   - Use different hooks to read / write from an abi contract
   - Interact with the user wallet

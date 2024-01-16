# Decentralized Raffle

🌐 Client App : https://foundry-raffle.vercel.app/

## About

This code is to create a provably random smart contract lottery.
This project stands in the context of Cyfrin Updraft blockchain course.

## What we can do with this ?

1. Users can enter by payer for a ticket.
   1. The ticket fees are going to go to the winner during the draw.
2. After X period of time, the lottery will automatically draw a winner.
   1. And this will be done programmatically
3. Using ChainLink VRF & ChainLink Automation
   1. ChainLink VRF => Randomness
   2. ChainLink Automation -> Time based trigger

## Tests

1. Write deploy script
2. Write our tests
   1. Work on a local chain
   2. Work on forked testnet
   3. Work on forked mainnet

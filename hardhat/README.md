# Hardhat Template

- [Hardhat Template](#hardhat-template)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Quickstart](#quickstart)
- [Usage](#usage)
  - [Deploying Contracts](#deploying-contracts)
  - [Run a Local Network](#run-a-local-network)
  - [Using a Testnet or Live Network (like Mainnet or Polygon)](#using-a-testnet-or-live-network-like-mainnet-or-polygon)
    - [Rinkeby Ethereum Testnet Setup](#rinkeby-ethereum-testnet-setup)
- [Test](#test)
  - [Verify on Etherscan](#verify-on-etherscan)
- [View Contracts Size](#view-contracts-size)
- [Linting](#linting)
- [Code Formating](#code-formating)
- [Estimating Gas](#estimating-gas)
- [Code coverage](#code-coverage)
- [Fuzzing](#fuzzing)
- [Contributing](#contributing)
- [Thank You!](#thank-you)
  - [Resources](#resources)

# Getting Started 

It's recommended that you've gone through the [hardhat getting started documentation](https://hardhat.org/getting-started/) before proceeding here. 

## Requirements

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you did it right if you can run `git --version` and you see a response like `git version x.x.x`
- [Node.js](https://nodejs.org/en/)
  - You'll know you've installed nodejs right if you can run:
    - `node --version`and get an ouput like: `vx.x.x`
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) instead of `npm`
  - You'll know you've installed yarn right if you can run:
    - `yarn --version` And get an output like: `x.x.x`
    - You might need to install it with npm

> If you're familiar with `npx` and `npm` instead of `yarn`, you can use `npx` for execution and `npm` for installing dependencies. 

## Quickstart

1. Clone and install dependencies

After installing all the requirements, run the following:

```bash
git clone https://github.com/web3slinger/hardhat-template.git
cd hardhat-template
```
Then:
```
yarn
```

or
```
npm i
```

2. You can now do stuff!

```
yarn hardhat test
```

or

```
yarn hardhat test
```

# Usage

If you run `yarn hardhat --help` you'll get an output of all the tasks you can run. 

## Deploying Contracts

```
yarn hardhat deploy
```

This will deploy your contracts to a local network. Additionally, if on a local network, it will deploy mock Chainlink contracts for you to interact with. If you'd like to interact with your deployed contracts, skip down to [Interacting with Deployed Contracts](#interacting-with-deployed-contracts).

## Run a Local Network

One of the best ways to test and interact with smart contracts is with a local network. To run a local network with all your contracts in it, run the following:

```
yarn hardhat node
```

You'll get a local blockchain, private keys, contracts deployed (from the `deploy` folder scripts), and an endpoint to potentially add to an EVM wallet. 

## Using a Testnet or Live Network (like Mainnet or Polygon)

In your `hardhat.config.js` you'll see section like:

```
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
```

This section of the file is where you define which networks you want to interact with. You can read more about that whole file in the [hardhat documentation.](https://hardhat.org/config/)

To interact with a live or test network, you'll need:

1. An rpc URL 
2. A Private Key
3. ETH & LINK token (either testnet or real)

Let's look at an example of setting these up using the Rinkeby testnet. 

### Rinkeby Ethereum Testnet Setup

First, we will need to set environment variables. We can do so by setting them in our `.env` file (create it if it's not there). You can also read more about [environment variables](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html) from the linked twilio blog. You'll find a sample of what this file will look like in `.env.example`

> IMPORTANT: MAKE SURE YOU'D DONT EXPOSE THE KEYS YOU PUT IN THIS `.env` FILE. By that, I mean don't push them to a public repo, and please try to keep them keys you use in development not associated with any real funds. 

1. Set your `RINKEBY_RPC_URL` [environment variable.](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html)

You can get one for free from [Alchmey](https://www.alchemy.com/), [Infura](https://infura.io/), or [Moralis](https://moralis.io/speedy-nodes/). This is your connection to the blockchain. 

2. Set your `PRIVATE_KEY` environment variable. 

This is your private key from your wallet, ie [MetaMask](https://metamask.io/). This is needed for deploying contracts to public networks. You can optionally set your `MNEMONIC` environment variable instead with some changes to the `hardhat.config.js`.

![WARNING](https://via.placeholder.com/15/f03c15/000000?text=+) **WARNING** ![WARNING](https://via.placeholder.com/15/f03c15/000000?text=+)

When developing, it's best practice to use a Metamask that isn't associated with any real money. A good way to do this is to make a new browser profile (on Chrome, Brave, Firefox, etc) and install Metamask on that brower, and never send this wallet money.  

Don't commit and push any changes to .env files that may contain sensitive information, such as a private key! If this information reaches a public GitHub repository, someone can use it to check if you have any Mainnet funds in that wallet address, and steal them!

`.env` example:
```
RINKEBY_RPC_URL=https://eth-rinkeby.alchemyapi.io/v2/your-api-key
PRIVATE_KEY=0x
```
`bash` example
```
export RINKEBY_RPC_URL=https://eth-rinkeby.alchemyapi.io/v2/your-api-key
export PRIVATE_KEY=0x
```
For other networks like mainnet and polygon, you can use different environment variables for your RPC URL and your private key. See the `hardhat.config.js` to learn more. 

3. Get some Rinkeby Testnet ETH and LINK 

Head over to the [Chainlink faucets](https://faucets.chain.link/) and get some ETH and LINK. Please follow [the chainlink documentation](https://docs.chain.link/docs/acquire-link/) if unfamiliar. 

5. Running commands

You should now be all setup! You can run any command and just pass the `--network rinkeby` now!

To deploy contracts:

```
yarn hardhat deploy --network rinkeby
```

To run staging testnet tests
```
yarn hardhat test --network rinkeby
```

# Test
Tests are located in the [test](./test/) directory, and are split between unit tests and staging/testnet tests. Unit tests should only be run on local environments, and staging tests should only run on live environments.

To run unit tests:

```bash
yarn test
```
or
```
yarn hardhat test
```

To run integration tests:

```bash
yarn test-integration
```

or

```
yarn hardhat test --network rinkeby
```

## Verify on Etherscan

You'll need an `ETHERSCAN_API_KEY` environment variable. You can get one from the [Etherscan API site.](https://etherscan.io/apis). If you have it set, your deploy script will try to verify them by default, but if you want to verify any manually, you can run: 

```
yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
```
example:

```
yarn hardhat verify --network rinkeby 0x9279791897f112a41FfDa267ff7DbBC46b96c296 "0x9326BFA02ADD2366b30bacB125260Af641031331"
```

# View Contracts Size

```
yarn run hardhat size-contracts
```

# Linting

This will [lint](https://stackoverflow.com/questions/8503559/what-is-linting) your smart contracts.  

```
yarn lint:fix
```

# Code Formating

This will format both your javascript and solidity to look nicer. 

```
yarn format
```

# Estimating Gas

To estimate gas, just set a `REPORT_GAS` environment variable to true, and then run:

```
yarn hardhat test
```

If you'd like to see the gas prices in USD or other currency, add a `COINMARKETCAP_API_KEY` from [Coinmarketcap](https://coinmarketcap.com/api/documentation/v1/).

# Code coverage

To see a measure in percent of the degree to which the smart contract source code is executed when a particular test suite is run, type
```
yarn coverage
```

# Fuzzing

We are going to use Echidna as a Fuzz testing tool. You need to have [Docker](https://www.docker.com/) installed with at least 8GB virtual memory allocated (To update this parameter go to _Settings->Resources->Advanced->Memory_). 

To start Echidna instance run

```
yarn fuzzing
```

If you are using it for the first time, you will need to wait for Docker to download [eth-security-toolbox](https://hub.docker.com/r/trailofbits/eth-security-toolbox) image for us.

To start Fuzzing run
```
echidna-test /src/contracts/test/fuzzing/KeepersCounterEchidnaTest.sol --contract KeepersCounterEchidnaTest --config /src/contracts/test/fuzzing/config.yaml
```

To exit Echidna type
```bash
exit
```

# Contributing

Contributions are always welcome! Open a PR or an issue!

# Thank You!

## Resources

- [Hardhat Starter Kit](https://github.com/smartcontractkit/hardhat-starter-kit/)
- [Hardhat Documentation](https://hardhat.org/getting-started/)
- [Chainlink Documentation](https://docs.chain.link/)
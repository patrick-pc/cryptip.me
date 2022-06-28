# 💸 <span>cryptip.me</span>

The friendly way to accept tips in ETH. It's free, and no setup required.
<span>cryptip.me</span>/your-ens-or-wallet-address

## Getting Started

Project structure:
- hardhat (smart contract)
- next-app (front-end)
- graph (event indexing)

### Requirements
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

## Usage

```bash
git clone https://github.com/web3slinger/cryptip.me.git
```

Setup environment variables. See .env.example

### next-app

```bash
cd next-app
yarn dev
```

### graph

See https://thegraph.com/en/ on how to create a subgraph.

### hardhat

```bash
cd hardhat
hh deploy
```

Testing:

```bash
hh test
```

### Deploying on mainnet or a testnet

1. Setup environment variables
2. Get ETH or testnet ETH
3. Deploy

```bash
hh deploy --network rinkeby
```

## Thank you!

If you appreciated this, feel free to follow me or tip me!

- cryptip.me/web3slinger.eth
- twitter.com/web3slinger
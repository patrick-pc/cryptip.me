const networkConfig = {
  default: {
    name: 'hardhat',
  },
  31337: {
    name: 'localhost',
  },
  4: {
    name: 'rinkeby',
  },
  5: {
    name: 'goerli',
  },
  1: {
    name: 'mainnet',
  },
  137: {
    name: 'polygon',
  },
}

const developmentChains = ['hardhat', 'localhost']
const VERIFICATION_BLOCK_CONFIRMATIONS = 6

module.exports = {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
}

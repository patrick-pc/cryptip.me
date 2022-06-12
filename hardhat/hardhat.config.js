require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')
require('hardhat-deploy')
require('hardhat-gas-reporter')
require('hardhat-contract-sizer')
require('solidity-coverage')
require('dotenv').config()

const PRIVATE_KEY = process.env.PRIVATE_KEY || '0x'
const RINKEBY_RPC_URL =
  process.env.RINKEBY_RPC_URL || 'https://eth-rinkeby.alchemyapi.io/v2/your-api-key'
const GOERLI_RPC_URL =
  process.env.GOERLI_RPC_URL || 'https://eth-goerli.alchemyapi.io/v2/your-api-key'
const MAINNET_RPC_URL =
  process.env.MAINNET_RPC_URL || 'https://eth-mainnet.alchemyapi.io/v2/your-api-key'
const POLYGON_MAINNET_RPC_URL =
  process.env.POLYGON_MAINNET_RPC_URL || 'https://polygon-mainnet.g.alchemy.com/v2/your-api-key'

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'Your etherscan API key'
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || 'Your polygonscan API key'
const REPORT_GAS = process.env.REPORT_GAS || false

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      // forking: {
      //   url: MAINNET_RPC_URL
      // }
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 4,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 5,
    },
    mainnet: {
      url: MAINNET_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 1,
    },
    polygon: {
      url: POLYGON_MAINNET_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 137,
    },
  },
  etherscan: {
    // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      rinkeby: ETHERSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
      polygon: POLYGONSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: REPORT_GAS,
    currency: 'USD',
    outputFile: 'gas-report.txt',
    noColors: true,
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  contractSizer: {
    runOnCompile: false,
    only: [],
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    // player: {
    //   default: 1,
    // },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.7',
      },
      {
        version: '0.6.6',
      },
      {
        version: '0.4.24',
      },
    ],
  },
  mocha: {
    timeout: 300000, // 300 seconds max for running tests
  },
}

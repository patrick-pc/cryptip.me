const { network, ethers, deployments, getNamedAccounts } = require('hardhat')
const { developmentChains } = require('../../helper-hardhat-config')
const { assert } = require('chai')

!developmentChains.includes(network.name)
  ? describe.skip
  : describe('Ether Coffee Unit Tests', function () {
      let deployer, etherCoffee
      const PRICE = ethers.utils.parseEther('1')

      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(['all'])
        etherCoffee = await ethers.getContract('EtherCoffee', deployer)
      })

      describe('getPrice', function () {
        it('Gets the price correcly', async function () {
          const price = await etherCoffee.getPrice()
          assert.equal(price.toString(), PRICE.toString())
        })
      })
    })

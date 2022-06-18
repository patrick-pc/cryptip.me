const { network, ethers, deployments, getNamedAccounts } = require('hardhat')
const { developmentChains } = require('../../helper-hardhat-config')
const { assert, expect } = require('chai')

!developmentChains.includes(network.name)
  ? describe.skip
  : describe('Ether Coffee Staging Tests', function () {
      let deployer, user, etherCoffeeContract, etherCoffee
      const sendValue = ethers.utils.parseEther('0.1')

      beforeEach(async function () {
        // deployer = (await getNamedAccounts()).deployer
        // user = (await getNamedAccounts()).user
        const accounts = await ethers.getSigners()
        deployer = accounts[0]
        user = accounts[1]
        await deployments.fixture(['all'])
        etherCoffeeContract = await ethers.getContract('EtherCoffee')
        etherCoffee = await etherCoffeeContract.connect(deployer)
      })

      it('Allows people to send eth and withdraw', async function () {
        await etherCoffee.buyCoffee(user.address, 'Peter', 'Gm', {
          value: sendValue,
        })

        etherCoffee = etherCoffeeContract.connect(user)
        const txResponse = await etherCoffee.withdrawProceeds()
        const txReceipt = await txResponse.wait()
        const { gasUsed, effectiveGasPrice } = txReceipt
        const gasCost = gasUsed.mul(effectiveGasPrice)
        const userBalance = await user.getBalance()

        assert(userBalance.add(gasCost).toString() == '10000100000000000000000')
      })
    })

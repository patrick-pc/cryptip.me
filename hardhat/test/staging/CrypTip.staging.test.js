const { network, ethers, deployments, getNamedAccounts } = require('hardhat')
const { developmentChains } = require('../../helper-hardhat-config')
const { assert, expect } = require('chai')

!developmentChains.includes(network.name)
  ? describe.skip
  : describe('CrypTip Staging Tests', function () {
      let deployer, user, cryptipContract, cryptip
      const sendValue = ethers.utils.parseEther('0.1')

      beforeEach(async function () {
        // deployer = (await getNamedAccounts()).deployer
        // user = (await getNamedAccounts()).user
        const accounts = await ethers.getSigners()
        deployer = accounts[0]
        user = accounts[1]
        await deployments.fixture(['all'])
        cryptipContract = await ethers.getContract('CrypTip')
        cryptip = await cryptipContract.connect(deployer)
      })

      it('Allows people to send eth and withdraw', async function () {
        await cryptip.sendTip(user.address, 'Peter', 'Gm', {
          value: sendValue,
        })

        cryptip = cryptipContract.connect(user)
        const txResponse = await cryptip.withdrawTips()
        const txReceipt = await txResponse.wait()
        const { gasUsed, effectiveGasPrice } = txReceipt
        const gasCost = gasUsed.mul(effectiveGasPrice)
        const addressBalance = await user.getBalance()

        assert(addressBalance.add(gasCost).toString() == '10000100000000000000000')
      })
    })

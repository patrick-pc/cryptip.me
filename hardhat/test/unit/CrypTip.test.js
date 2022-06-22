const { network, ethers, deployments, getNamedAccounts } = require('hardhat')
const { developmentChains } = require('../../helper-hardhat-config')
const { assert, expect } = require('chai')

!developmentChains.includes(network.name)
  ? describe.skip
  : describe('CrypTip Unit Tests', function () {
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

      describe('sendTip', function () {
        it('Reverts if you send less than or equal to 0', async () => {
          await expect(
            cryptip.sendTip(user.address, 'Peter', 'Gm', {
              value: '0',
            })
          ).to.be.revertedWith('CrypTip__ValueMustBeAboveZero')
        })
        it('Updates contract tips record', async function () {
          const txResponse = await cryptip.sendTip(user.address, 'Peter', 'Gm', {
            value: sendValue,
          })
          txResponse.wait()

          const addressTips = await cryptip.getTipBalance(user.address)
          const contractBalance = await cryptip.provider.getBalance(cryptip.address)
          assert(addressTips.toString() == contractBalance.toString())
        })
        it('Emits an event after sending a tip', async function () {
          expect(
            await cryptip.sendTip(user.address, 'Peter', 'Gm', {
              value: sendValue,
            })
          ).to.emit('Tip')
        })
      })

      describe('withdrawTips', function () {
        it("Doesn't allow 0 tips withdrawals", async function () {
          await expect(cryptip.withdrawTips()).to.be.revertedWith('CrypTip__NoTips')
        })
        it('Address tips is set to 0', async function () {
          await cryptip.sendTip(user.address, 'Peter', 'Gm', {
            value: sendValue,
          })

          cryptip = cryptipContract.connect(user)
          const txResponse = await cryptip.withdrawTips()
          const txReceipt = await txResponse.wait()
          const contractBalance = await cryptip.provider.getBalance(cryptip.address)

          assert(contractBalance.toString() == '0')
        })
        it('Withdraws tips', async function () {
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
    })

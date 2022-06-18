const { network, ethers, deployments, getNamedAccounts } = require('hardhat')
const { developmentChains } = require('../../helper-hardhat-config')
const { assert, expect } = require('chai')

!developmentChains.includes(network.name)
  ? describe.skip
  : describe('Ether Coffee Unit Tests', function () {
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

      describe('buyCoffee', function () {
        it('Reverts if you send less than or equal to 0', async () => {
          await expect(
            etherCoffee.buyCoffee(user.address, 'Peter', 'Gm', {
              value: '0',
            })
          ).to.be.revertedWith('EtherCoffee__ValueMustBeAboveZero')
        })
        it('Updates contract proceeds record', async function () {
          const tx = await etherCoffee.buyCoffee(user.address, 'Peter', 'Gm', {
            value: sendValue,
          })
          tx.wait()

          const userProceeds = await etherCoffee.getProceeds(user.address)
          const contractBalance = await etherCoffee.provider.getBalance(etherCoffee.address)
          assert(userProceeds.toString() == contractBalance.toString())
        })
        it('Emits an event after buying a coffee', async function () {
          expect(
            await etherCoffee.buyCoffee(user.address, 'Peter', 'Gm', {
              value: sendValue,
            })
          ).to.emit('CoffeeBought')
        })
      })

      describe('withdrawProceeds', function () {
        it("Doesn't allow 0 proceed withdrawals", async function () {
          await expect(etherCoffee.withdrawProceeds()).to.be.revertedWith('EtherCoffee__NoProceeds')
        })
        it('User proceeds is set to 0', async function () {
          await etherCoffee.buyCoffee(user.address, 'Peter', 'Gm', {
            value: sendValue,
          })

          etherCoffee = etherCoffeeContract.connect(user)
          const txResponse = await etherCoffee.withdrawProceeds()
          const txReceipt = await txResponse.wait()
          const contractBalance = await etherCoffee.provider.getBalance(etherCoffee.address)

          assert(contractBalance.toString() == '0')
        })
        it('Withdraws proceeds', async function () {
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
    })

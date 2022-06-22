const { ethers } = require('hardhat')

async function withdrawTips() {
  const accounts = await ethers.getSigners()
  const deployer = accounts[0]
  const user = accounts[1]
  const cryptipContract = await ethers.getContract('CrypTip', deployer.address)
  const cryptip = cryptipContract.connect(user)

  console.log('Withdrawing tips...')
  const tipBalanceBefore = await cryptip.getTipBalance(user.address)
  console.log('Tip balance before: ', ethers.utils.formatEther(tipBalanceBefore.toString()))
  const txResponse = await cryptip.withdrawTips()
  await txResponse.wait()
  console.log('Tip sent to address: ', user.address)
  const tipBalanceAfter = await cryptip.getTipBalance(user.address)
  console.log('Tip balance after: ', ethers.utils.formatEther(tipBalanceAfter.toString()))
}

withdrawTips()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

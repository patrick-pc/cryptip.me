const { ethers } = require('hardhat')

async function sendTip() {
  const accounts = await ethers.getSigners()
  const deployer = accounts[0]
  const user = accounts[1]
  const cryptipContract = await ethers.getContract('CrypTip', deployer.address)
  console.log('Contract address:', cryptipContract.address)

  console.log('Sending tip...')
  const txResponse = await cryptipContract.sendTip(user.address, 'Peter', 'Gm', {
    value: ethers.utils.parseEther('0.1'),
  })
  await txResponse.wait()
  console.log('Tip sent to: ', user.address)
}

sendTip()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

const { ethers, getNamedAccounts } = require('hardhat')

async function withdrawProceeds() {
  const { deployer } = await getNamedAccounts()
  const etherCoffee = await ethers.getContract('EtherCoffee', deployer)
  console.log('Contract address:', etherCoffee.address)

  console.log('Withdrawing proceeds...')
  const tx = await etherCoffee.withdrawProceeds()
  await tx.wait()
  console.log('Got it back!')
}

withdrawProceeds()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

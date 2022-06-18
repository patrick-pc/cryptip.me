const { ethers, getNamedAccounts } = require('hardhat')

async function buyCoffee() {
  const { deployer } = await getNamedAccounts()
  const etherCoffee = await ethers.getContract('EtherCoffee', deployer)
  console.log('Contract address:', etherCoffee.address)

  console.log('Buying coffee...')
  const tx = await etherCoffee.buyCoffee(deployer, 'Peter', 'Gm', {
    value: ethers.utils.parseEther('0.1'),
  })
  await tx.wait()
  console.log('Coffee bought!')
}

buyCoffee()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

const { ethers } = require('hardhat')

async function getPrice() {
  const etherCoffee = await ethers.getContract('EtherCoffee')
  const price = await etherCoffee.getPrice()
  console.log(price.toString())
}

getPrice()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

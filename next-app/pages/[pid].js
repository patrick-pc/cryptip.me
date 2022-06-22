import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useAccount, useProvider, useSigner, useContract } from 'wagmi'
import { useQuery } from '@apollo/client'
import { CONTRACT_ADDRESS, ABI } from '../constants'
import { GET_TIPS } from '../constants/subgraphQueries'
import Header from '../components/Header'
import makeBlockie from 'ethereum-blockies-base64'

const Profile = () => {
  const { pid } = useRouter().query
  const { data: connectedAccount } = useAccount()
  const provider = useProvider()
  const signer = useSigner()

  const [ens, setEns] = useState()
  const [ensAvatar, setEnsAvatar] = useState()
  const [walletAddress, setWalletAddress] = useState()
  const [isFetching, setIsFetching] = useState(false)

  const isOwnAccount = () => {
    return connectedAccount?.address === walletAddress
  }

  // TODO: Create custom hook for addresses
  const validateAddress = async () => {
    setIsFetching(true)
    if (pid.includes('.eth')) {
      // Check if the ens is valid
      const validAddress = await provider.resolveName(pid)

      if (validAddress) {
        setWalletAddress(validAddress)
        setEns(pid)

        // Get ens avatar
        const ensAvatar = await provider.getAvatar(pid)
        if (ensAvatar) setEnsAvatar(ensAvatar)
      } else {
        alert('Address not found')
      }
    } else {
      // Check if the address is valid if not using ens
      const validAddress = ethers.utils.isAddress(pid)

      if (validAddress) {
        setWalletAddress(pid)

        // Check if the address has ens
        const ens = await provider.lookupAddress(pid)
        if (ens) {
          setEns(ens)

          // Get ens avatar
          const ensAvatar = await provider.getAvatar(pid)
          if (ensAvatar) setEnsAvatar(ensAvatar)
        }
      } else {
        alert('Address not found')
      }
    }
    setIsFetching(false)
  }

  useEffect(() => {
    if (!pid) return

    validateAddress()
  }, [pid])

  const cryptipContract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: ABI,
    signerOrProvider: signer.data || provider,
  })

  const { data } = useQuery(GET_TIPS({ address: walletAddress }))

  const sendTip = async () => {
    const tip = ethers.utils.parseEther('0.1')

    const txResponse = await cryptipContract.sendTip(walletAddress, '', '', {
      value: tip,
    })
    await txResponse.wait()
    alert('Tip sent!')
  }

  const getTipBalance = async () => {
    const proceeds = await cryptipContract.getTipBalance(walletAddress)
    alert(ethers.utils.formatEther(proceeds))
  }

  const withdrawTips = async () => {
    const txResponse = await cryptipContract.withdrawTips()
    await txResponse.wait()
    alert('Tips withdrew! Please, check your wallet')
  }

  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center mt-16'>
        <h2>{ens && ens}</h2>
        <h3>{walletAddress && walletAddress}</h3>
        <div>{ensAvatar && <img src={ensAvatar} />}</div>
        <div>
          {walletAddress && !ensAvatar && (
            <img src={makeBlockie(walletAddress)} />
          )}
        </div>

        <div className='flex gap-4 mt-16'>
          <button onClick={sendTip} className='btn btn-primary'>
            Tip
          </button>
          {isOwnAccount() && (
            <>
              <button onClick={getTipBalance} className='btn btn-secondary'>
                Get Tip Balance
              </button>
              <button onClick={withdrawTips} className='btn btn-accent'>
                Withdraw Tips
              </button>
            </>
          )}
        </div>

        {data &&
          data.tips.map((tip) => {
            return (
              <ul key={tip.id}>
                <li>{tip.name}</li>
                <li>{tip.message}</li>
                <li>{tip.amount}</li>
                <li>{tip.timestamp}</li>
              </ul>
            )
          })}
      </div>
    </>
  )
}

export default Profile

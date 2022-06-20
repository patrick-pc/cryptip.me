import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useProvider, useSigner } from 'wagmi'
import Header from '../components/Header'
import makeBlockie from 'ethereum-blockies-base64'

const Profile = () => {
  const { pid } = useRouter().query
  const provider = useProvider()
  const signer = useSigner()

  const [ens, setEns] = useState()
  const [ensAvatar, setEnsAvatar] = useState()
  const [walletAddress, setWalletAddress] = useState()
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    if (!pid) return

    // TODO: Create custom hook for addresses
    const validateAddress = async () => {
      setIsFetching(true)
      if (pid.includes('.eth')) {
        const validAddress = await provider.resolveName(pid)

        // Check if the ens is valid
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

    validateAddress()
  }, [pid])

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
      </div>
    </>
  )
}

export default Profile

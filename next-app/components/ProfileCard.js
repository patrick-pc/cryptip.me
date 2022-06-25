import { useState } from 'react'
import { ethers } from 'ethers'
import { useAccount, useProvider, useSigner, useContract } from 'wagmi'
import { CONTRACT_ADDRESS, ABI } from '../constants'
import { shortenAddress } from '../utils/shortenAddress'
import Avatar from './Avatar'
import CurrencyInput from 'react-currency-input-field'
import toast from 'react-hot-toast'

const ProfileCard = ({ address, ensName }) => {
  const { data: connectedAccount } = useAccount()
  const provider = useProvider()
  const signer = useSigner()

  const [amount, setAmount] = useState('0.01')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const isOwnAddress = () => {
    return connectedAccount?.address === address
  }

  const cryptipContract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: ABI,
    signerOrProvider: signer.data || provider,
  })

  const sendTip = async () => {
    const txResponse = await cryptipContract.sendTip(address, name, message, {
      value: ethers.utils.parseEther(amount),
    })
    await txResponse.wait()
    toast.success('Tip sent!')
  }

  const getTipBalance = async (address) => {
    const tipBalance = await cryptipContract.getTipBalance(address)
    // setTipBalance(ethers.utils.formatEther(tipBalance))
    toast.success(ethers.utils.formatEther(tipBalance))
    if (tipBalance) {
      setTipBalance(ethers.utils.formatEther(tipBalance))
    }
  }

  const withdrawTips = async () => {
    const txResponse = await cryptipContract.withdrawTips()
    await txResponse.wait()
    toast.success('Tips sent to your wallet!')
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <Avatar address={address} size={100} squircle={true} />

      <div className='flex flex-col items-center justify-center'>
        {address && !ensName ? (
          <h1 className='text-xl font-bold'>{shortenAddress(address)}</h1>
        ) : (
          <>
            <h1 className='text-2xl font-bold mb-2'>{ensName}</h1>
            <span className='bg-base-200 py-1 px-2 rounded-md text-xs font-mono'>
              {shortenAddress(address)}
            </span>
          </>
        )}
      </div>

      <form
        className='flex flex-col gap-4'
        onSubmit={(e) => e.preventDefault()}
      >
        <CurrencyInput
          className='text-center text-5xl font-extrabold bg-base-100 w-full focus:outline-none my-4'
          prefix='Ξ'
          defaultValue={amount}
          decimalsLimit={18}
          onChange={(e) => setAmount(e.target.value)}
          autoFocus={true}
          disabled={isOwnAddress()}
        />
        <button
          onClick={sendTip}
          className='btn btn-block btn-lg bg-black rounded-box text-sm'
          disabled={isOwnAddress()}
        >
          Send Tip
        </button>
        <input
          type='text'
          placeholder='Name (optional)'
          className='input input-bordered w-full focus:outline-none'
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          disabled={isOwnAddress()}
        />
        <textarea
          className='textarea input-bordered w-full focus:outline-none'
          placeholder='Message (optional)'
          onChange={(e) => setMessage(e.target.value)}
          maxLength={150}
          disabled={isOwnAddress()}
        ></textarea>
      </form>
    </div>
  )
}

export default ProfileCard

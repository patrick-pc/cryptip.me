import { useEffect, useState, useMemo } from 'react'
import { ethers } from 'ethers'
import {
  useAccount,
  useProvider,
  useSigner,
  useContract,
  useBalance,
} from 'wagmi'
import { CONTRACT_ADDRESS, ABI } from '../constants'
import { getTips } from '../data/tips'
import { shortenAddress } from '../utils/shortenAddress'
import { copyAddress } from '../utils/copyAddress'
import Avatar from './Avatar'
import CurrencyInput from 'react-currency-input-field'
import toast from 'react-hot-toast'
import { Orbit } from '@uiball/loaders'

const ProfileCard = ({ address, ensName }) => {
  const { data: connectedAccount } = useAccount()
  const provider = useProvider()
  const signer = useSigner()

  const [amount, setAmount] = useState('0.01')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [tipBalance, setTipBalance] = useState(0)
  const [totalTippers, setTotalTippers] = useState(0)
  const [totalTips, setTotalTips] = useState(0)
  const [isMining, setIsMining] = useState(false)

  const cryptipContract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: ABI,
    signerOrProvider: signer.data || provider,
  })

  const sendTip = async () => {
    if (connectedAccount) {
      if (accountBalance.formatted == 0 || accountBalance.formatted <= amount) {
        toast('Insufficient funds.', {
          icon: '✋',
        })
        return
      }

      try {
        const txResponse = await cryptipContract.sendTip(
          address,
          name,
          message,
          {
            value: ethers.utils.parseEther(amount),
          }
        )
        setIsMining(true)
        await txResponse.wait()
        setIsMining(false)
        setAmount('0.01')

        toast('Tip sent!', {
          icon: '🎉',
        })
      } catch (error) {
        console.error(error)

        if (error.code == 4001) {
          toast.error(error.message)
        } else {
          toast.error('Something went wrong.')
        }
      }
    } else {
      toast('Connect wallet to continue.', {
        icon: '🦊',
      })

      return
    }
  }

  const getTipBalance = async (address) => {
    try {
      const tipBalance = await cryptipContract.getTipBalance(address)
      setTipBalance(ethers.utils.formatEther(tipBalance))
    } catch (error) {
      console.error(error)

      if (error.code == 4001) {
        toast.error(error.message)
      } else {
        toast.error('Something went wrong.')
      }
    }
  }

  const withdrawTips = async () => {
    try {
      const txResponse = await cryptipContract.withdrawTips()
      setIsMining(true)
      await txResponse.wait()
      setIsMining(false)
      setTipBalance(0)

      toast('Tips sent to your wallet!', {
        icon: '💸',
      })
    } catch (error) {
      console.error(error)

      if (error.code == 4001) {
        toast.error(error.message)
      } else {
        toast.error('Something went wrong.')
      }
    }
  }

  // Check if the user owns the address
  const isOwnAddress = () => {
    if (!connectedAccount) return
    return address === connectedAccount.address
  }

  // Get tips from subgraph query
  const { data } = getTips({ address })

  // const { data } = useMemo(() => getTips({ address }), [amount])

  // Get account balance
  const { data: accountBalance } = useBalance({
    addressOrName: connectedAccount?.address,
  })

  useEffect(() => {
    if (isOwnAddress()) {
      getTipBalance(address)

      // Set total tippers and total tips
      if (data) {
        let tipperCount = 0
        let tipAmount = 0
        data.tips.map((tip) => {
          tipperCount += 1
          tipAmount += parseFloat(ethers.utils.formatEther(tip.amount))
        })

        setTotalTippers(tipperCount)
        setTotalTips(tipAmount)
      }
    }
  }, [isOwnAddress(), tipBalance, data])

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <Avatar address={address} size={100} squircle={true} />

      <div className='flex flex-col items-center justify-center'>
        {address && !ensName ? (
          <div
            className='cursor-pointer tooltip tooltip-right'
            data-tip='Copy address'
            onClick={() => {
              copyAddress(address)
            }}
          >
            <h1 className='text-xl font-bold'>{shortenAddress(address)}</h1>
          </div>
        ) : (
          <>
            <h1 className='text-2xl font-bold mb-2'>{ensName}</h1>
            <div
              className='cursor-pointer tooltip tooltip-right'
              data-tip='Copy address'
              onClick={() => {
                copyAddress(address)
              }}
            >
              <span className='bg-base-200 py-1 px-2 rounded-md text-xs font-mono'>
                {shortenAddress(address)}
              </span>
            </div>
          </>
        )}
      </div>

      <form
        className='flex flex-col gap-4'
        onSubmit={(e) => e.preventDefault()}
      >
        {isOwnAddress() ? (
          <>
            <CurrencyInput
              className='text-center text-5xl text-black font-extrabold bg-base-100 w-full focus:outline-none my-4'
              prefix='Ξ'
              defaultValue={
                tipBalance == 0
                  ? 0
                  : parseFloat(tipBalance).toFixed(3).slice(0, -1)
              }
              key={
                tipBalance == 0
                  ? 0
                  : parseFloat(tipBalance).toFixed(3).slice(0, -1)
              }
              decimalsLimit={18}
              readOnly={true}
            />
            <button
              onClick={withdrawTips}
              className='btn btn-block btn-lg bg-black rounded-box text-sm'
              disabled={isMining || tipBalance == 0}
            >
              {isMining ? <Orbit /> : 'Withdraw Tips'}
            </button>
            <div className='stats stats-horizontal border text-sm'>
              <div className='stat'>
                <div className='stat-title'>Total Tippers</div>
                <div className='stat-value'>{totalTippers}</div>
              </div>

              <div className='stat'>
                <div className='stat-title'>Total Tips</div>
                <div className='stat-value'>
                  {totalTips == 0
                    ? 0
                    : parseFloat(totalTips).toFixed(3).slice(0, -1)}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <CurrencyInput
              className='text-center text-5xl text-black font-extrabold bg-base-100 w-full focus:outline-none my-4'
              prefix='Ξ'
              defaultValue={amount}
              decimalsLimit={18}
              onValueChange={(value) => setAmount(value)}
              autoFocus={true}
            />
            <button
              onClick={sendTip}
              className='btn btn-block btn-lg bg-black rounded-box text-sm'
              disabled={isMining || !amount || amount == 0}
            >
              {isMining ? <Orbit /> : 'Send Tip'}
            </button>
            <input
              type='text'
              placeholder='Name (optional)'
              className='input input-bordered w-full focus:outline-none'
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
            />
            <textarea
              className='textarea input-bordered w-full focus:outline-none'
              placeholder='Message (optional)'
              onChange={(e) => setMessage(e.target.value)}
              maxLength={150}
            ></textarea>
          </>
        )}
      </form>
    </div>
  )
}

export default ProfileCard

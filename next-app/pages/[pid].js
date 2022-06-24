import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useAccount, useProvider, useSigner, useContract } from 'wagmi'
import { CONTRACT_ADDRESS, ABI } from '../constants'
import { Header } from '../components/Header'
import { Avatar } from '../components/Avatar'
import { TipCard } from '../components/TipCard'
import { validateAddress } from '../utils/validateAddress'
import { shortenAddress } from '../utils/shortenAddress'
import { getTips } from '../data/tips'
import CurrencyInput from 'react-currency-input-field'
import FadeIn from 'react-fade-in'
import toast from 'react-hot-toast'

const Profile = () => {
  const { pid } = useRouter().query
  const { data: connectedAccount } = useAccount()
  const provider = useProvider()
  const signer = useSigner()

  const [ens, setEns] = useState()
  const [walletAddress, setWalletAddress] = useState()
  // const [isOwnAddress, setIsOwnAddress] = useState(false)
  // const [isFetching, setIsFetching] = useState(false)

  const [amount, setAmount] = useState('0.01')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  // Check if the address is valid
  const { validAddress, ensName } = validateAddress(pid)
  useEffect(() => {
    if (!pid) return

    if (validAddress) {
      setWalletAddress(validAddress)
      setEns(ensName)
    }
  }, [pid])

  // Check if the connected user owns the wallet address
  const isOwnAddress = () => {
    return connectedAccount?.address === walletAddress
  }

  // Get tips from subgraph query
  const { data } = getTips({ address: walletAddress })

  const cryptipContract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: ABI,
    signerOrProvider: signer.data || provider,
  })

  const sendTip = async () => {
    const txResponse = await cryptipContract.sendTip(
      walletAddress,
      name,
      message,
      {
        value: ethers.utils.parseEther(amount),
      }
    )
    await txResponse.wait()
    toast.success('Tip sent!')
  }

  const getTipBalance = async () => {
    const proceeds = await cryptipContract.getTipBalance(walletAddress)
    toast.success(ethers.utils.formatEther(proceeds))
  }

  const withdrawTips = async () => {
    const txResponse = await cryptipContract.withdrawTips()
    await txResponse.wait()
    toast.success('Tips sent to your wallet!')
  }

  return (
    <>
      <Header />

      <FadeIn>
        <div className='flex flex-col gap-6 md:flex-row items-center md:items-start justify-center w-full h-full bg-base-200'>
          <div className='flex flex-col items-center justify-center bg-base-100 rounded-box md:w-96 gap-4 m-4 p-6 pt-12 shadow-xl'>
            <Avatar address={walletAddress} size={100} squircle={true} />

            <div className='flex flex-col items-center justify-center'>
              {walletAddress && !ens ? (
                <h1 className='text-xl font-bold'>
                  {shortenAddress(walletAddress)}
                </h1>
              ) : (
                <>
                  <h1 className='text-2xl font-bold mb-2'>{ens}</h1>
                  <span className='bg-base-200 py-1 px-2 rounded-md text-xs font-mono'>
                    {shortenAddress(walletAddress)}
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
                defaultValue={`${amount}`}
                decimalsLimit={18}
                onChange={(e) => setAmount(e.target.value)}
                autoFocus={true}
              />
              <button
                onClick={sendTip}
                className='btn btn-block btn-lg bg-black rounded-box text-sm'
              >
                Send Tip
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
            </form>
          </div>

          <div className='flex flex-col gap-4 m-4 md:w-96'>
            <h2 className='text-xl font-extrabold'>Recent Supporters</h2>

            <div className='flex flex-col gap-4 md:h-[590.5px] overflow-auto'>
              {data && data.tips.length !== 0 ? (
                data.tips.map((tip) => {
                  return (
                    <div key={tip.id}>
                      <FadeIn>
                        <TipCard tip={tip} />
                      </FadeIn>
                    </div>
                  )
                })
              ) : (
                <div>No tippers yet...</div>
              )}
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-between mt-16'>
          <div className='flex gap-4 mt-16'>
            {isOwnAddress() && (
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
        </div>
      </FadeIn>
    </>
  )
}

export default Profile

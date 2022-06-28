import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useProvider, useSigner, useContract } from 'wagmi'
import { CONTRACT_ADDRESS, ABI } from '../constants'
import { validateAddress } from '../utils/validateAddress'
import { getTips } from '../data/tips'
import ProfileCard from '../components/ProfileCard'
import TipCard from '../components/TipCard'
import Custom404 from './404'
import FadeIn from 'react-fade-in'

const Profile = () => {
  const provider = useProvider()
  const signer = useSigner()

  const cryptipContract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: ABI,
    signerOrProvider: signer.data || provider,
  })

  const [tipList, setTipList] = useState([])
  const [isTipSent, setIsTipSent] = useState(false)

  // Get the address from the URL
  const { pid } = useRouter().query

  // Check if the address is valid
  const { address, ensName } = validateAddress(pid)

  // Get tips from subgraph query
  const { data } = getTips({ address, limit: 10 })

  // Listen to tip event
  // Could refetch the data from the subgraph query but it takes too long
  useEffect(() => {
    if (data) setTipList(data.tips)

    if (isTipSent) {
      // Tip event
      cryptipContract.on(
        'Tip',
        (receiver, sender, amount, name, message, event, data) => {
          const tip = {
            id: `${event.transactionHash}-${event.logIndex}`,
            receiver,
            sender,
            amount,
            name,
            message,
            timestamp: Date.now() / 1000,
            txHash: event.transactionHash,
          }

          let tipListCopy = []
          if (tipList.length == 0) {
            tipListCopy.push(tip)
          } else if (tipList.length >= 10) {
            tipListCopy = [...tipList]
            tipListCopy.splice(0, 0, tip)
            tipListCopy.pop()
          } else {
            tipListCopy = [...tipList]
            tipListCopy.splice(0, 0, tip)
          }
          setTipList(tipListCopy)
        }
      )

      setIsTipSent(false)
    }
  }, [data, isTipSent])

  return (
    <FadeIn>
      {address ? (
        <div className='flex flex-col md:flex-row items-center md:items-start justify-center h-full w-full gap-6 pb-12'>
          <div className='w-full md:w-[450px]'>
            <ProfileCard
              cryptipContract={cryptipContract}
              address={address}
              ensName={ensName}
              setIsTipSent={setIsTipSent}
            />
          </div>

          <div className='w-full md:w-[450px]'>
            <div className='flex flex-col gap-4 m-4'>
              <h2 className='text-xl font-extrabold'>Recent Supporters</h2>

              <div
                className={`flex flex-col gap-4 overflow-auto ${
                  ensName ? 'md:h-[545px]' : 'md:h-[510px]'
                }`}
              >
                {tipList && tipList.length !== 0 ? (
                  tipList.map((tip) => {
                    return (
                      <div key={tip.id}>
                        <FadeIn>
                          <TipCard tip={tip} />
                        </FadeIn>
                      </div>
                    )
                  })
                ) : (
                  <div className='flex flex-row bg-base-300 text-gray-400 rounded-box gap-4 p-4'>
                    No tippers yet...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Custom404 />
      )}
    </FadeIn>
  )
}

export default Profile

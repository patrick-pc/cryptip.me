import { useRouter } from 'next/router'
import { validateAddress } from '../utils/validateAddress'
import { getTips } from '../data/tips'
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'
import TipCard from '../components/TipCard'
import FadeIn from 'react-fade-in'

const Profile = () => {
  const { pid } = useRouter().query

  // Check if the address is valid
  const { address, ensName } = validateAddress(pid)

  // Get tips from subgraph query
  const { data } = getTips({ address: address, limit: 10 })

  if (!address) return <div>404</div>
  return (
    <>
      <Header />

      <FadeIn>
        <div className='flex flex-col gap-6 md:flex-row items-center md:items-start justify-center w-full h-full bg-base-200'>
          <div className='flex flex-col items-center justify-center bg-base-100 rounded-box md:w-96 gap-4 m-4 p-6 pt-12 shadow-xl'>
            <ProfileCard address={address} ensName={ensName} />
          </div>

          <div className='flex flex-col w-full md:w-96'>
            <div className='flex flex-col gap-4 m-4'>
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
                  <div className='flex flex-row text-gray-400 bg-base-300 rounded-box gap-4 p-4'>
                    No tippers yet...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  )
}

export default Profile

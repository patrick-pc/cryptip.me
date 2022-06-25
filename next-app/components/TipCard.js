import moment from 'moment'
import { ethers } from 'ethers'
import { shortenAddress } from '../utils/shortenAddress'
import Avatar from './Avatar'

const TipCard = ({ tip }) => {
  return (
    <div className='flex flex-row bg-base-100 rounded-box gap-4 p-4'>
      <Avatar address={tip.sender} size={40} />

      <div className='flex flex-col w-full'>
        <div className='flex flex-row justify-between mb-1'>
          <div>
            <span className='text-sm font-semibold mr-2'>
              {tip.name ? tip.name : 'Tipper'}
            </span>
            <span className='bg-green-50 border border-green-500 rounded-md text-xs text-green-500 font-semibold p-1'>
              Ξ{ethers.utils.formatEther(tip.amount)}
            </span>
          </div>
          <div className='flex items-center font-light text-2xs text-gray-400'>
            {moment(tip.timestamp * 1000)
              .startOf('hour')
              .fromNow()}
          </div>
        </div>
        <div>
          <span className='bg-base-200 py-1 px-2 rounded-md text-2xs font-mono text-gray-400'>
            {shortenAddress(tip.sender)}
          </span>
        </div>
        {tip.message && <div className='font-medium mt-4'>{tip.message}</div>}
      </div>
    </div>
  )
}

export default TipCard

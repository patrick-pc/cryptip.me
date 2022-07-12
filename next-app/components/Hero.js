import { useState } from 'react'
import NextLink from 'next/link'

const Hero = () => {
  const [address, setAddress] = useState('')

  return (
    <div className='flex flex-col items-center justify-center text-center gap-4 m-4'>
      <h1 className='bg-clip-text bg-gradient-to-tr from-blue-500 to-red-500 text-transparent text-5xl font-bold mb-6'>
        The friendly way to accept tips in ETH.
      </h1>
      <div className='flex flex-row items-center justify-center rounded-full bg-white shadow-xl w-full p-4 md:px-6'>
        <span className='bg-white text-lg font-medium'>cryptip.me/</span>
        <input
          type='text'
          className='bg-base-100 text-lg font-light outline-none w-full px-1'
          placeholder='your-ens-or-wallet-address'
          onChange={(e) => setAddress(e.target.value)}
        />
        <NextLink href={`${address}`}>
          <span className='btn bg-black rounded-full'>Start Today</span>
        </NextLink>
      </div>
      <div className='text-gray-500 text-sm font-light'>
        It's free, and no setup required.
      </div>
    </div>
  )
}

export default Hero

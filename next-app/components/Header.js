import NextLink from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const Header = () => {
  return (
    <div className='navbar bg-base-200 p-6 mb-6'>
      <div className='flex-1'>
        <NextLink href='/'>
          <span className='font-bold text-2xl cursor-pointer'>cryptip.me</span>
        </NextLink>
      </div>
      <div className='flex-none'>
        <ConnectButton />
      </div>
    </div>
  )
}

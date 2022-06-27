import NextLink from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Header = () => {
  return (
    <header className='flex flex-col items-center justify-between md:flex-row bg-base-200 gap-4 p-6 mb-6'>
      <div className='flex'>
        <NextLink href='/'>
          <span className='font-bold text-2xl cursor-pointer'>cryptip.me</span>
        </NextLink>
      </div>
      <div className='flex-none'>
        <ConnectButton />
      </div>
    </header>
  )
}

export default Header

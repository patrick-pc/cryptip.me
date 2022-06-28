import NextLink from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Header = () => {
  return (
    <header className='flex flex-row items-center justify-between gap-2 p-6 mb-6'>
      <div className='flex'>
        <NextLink href='/'>
          <div className='flex flex-row items-center justify-center font-bold text-2xl cursor-pointer'>
            <img
              className='max-h-12 max-w-12 p-2'
              src='/ethereum.png'
              alt='cryptip.me '
            />
            <span className='hidden md:flex'>cryptip.me</span>
          </div>
        </NextLink>
      </div>
      <div className='flex-none'>
        <ConnectButton />
      </div>
    </header>
  )
}
export default Header

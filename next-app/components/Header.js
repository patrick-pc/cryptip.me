import { ConnectButton } from '@rainbow-me/rainbowkit'

const Header = () => {
  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <a className='font-bold text-2xl cursor-pointer'>
          <span className='text-primary'>ΞTHER</span> COFFEE
        </a>
      </div>
      <div className='flex-none'>
        <ConnectButton />
      </div>
    </div>
  )
}

export default Header

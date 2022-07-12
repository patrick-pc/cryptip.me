import { socialData } from '../data/socials'

const Footer = () => {
  return (
    <footer className='flex flex-col items-center justify-center text-gray-500 font-medium gap-2 p-10 sticky top-[100vh]'>
      <a
        href={socialData.CRYPTIP_GITHUB}
        target='_blank'
        className='opacity-75 hover:opacity-100'
      >
        👾 github
      </a>
      <a
        href={socialData.CRYPTIP_CONTRACT_ADDRESS}
        target='_blank'
        className='opacity-75 hover:opacity-100'
      >
        📜 contract address
      </a>
      <a
        href={socialData.TWITTER}
        target='_blank'
        className='opacity-75 hover:opacity-100'
      >
        🕷 made by web3slinger
      </a>

      <a
        href={socialData.FLATICON}
        target='_blank'
        className='text-xs font-light opacity-75 hover:opacity-100'
      >
        Logo by Freepik - Flaticon
      </a>
    </footer>
  )
}

export default Footer

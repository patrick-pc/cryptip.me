import { socialData } from '../data/socials'

const Footer = () => {
  return (
    <footer className='flex flex-col items-center justify-center bg-base-200 text-gray-500 font-medium gap-2 p-10 sticky top-[100vh]'>
      <a
        href={socialData.GITHUB_CRYPTIP}
        target='_blank'
        className='opacity-75 hover:opacity-100'
      >
        👾 github
      </a>
      <a
        href={socialData.TWITTER}
        target='_blank'
        className='opacity-75 hover:opacity-100'
      >
        🕷 built by web3slinger
      </a>
    </footer>
  )
}

export default Footer

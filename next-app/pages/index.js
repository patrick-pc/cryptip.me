import Hero from '../components/Hero'
import ProfileCardDemo from '../components/ProfileCardDemo'
import FadeIn from 'react-fade-in'

export default function Home() {
  return (
    <FadeIn>
      <div className='flex flex-col md:flex-row items-center justify-center h-full w-full gap-12 pb-12'>
        <div className='w-full lg:w-[650px]'>
          <Hero />
        </div>
        <div className='w-full lg:w-[450px]'>
          <ProfileCardDemo />
        </div>
      </div>
    </FadeIn>
  )
}

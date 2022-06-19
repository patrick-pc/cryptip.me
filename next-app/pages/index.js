import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ether Coffee</title>
        <meta
          name='description'
          content='Ether Coffee is the best way for creators and artists to accept support in Ether.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <div className='flex items-center justify-center h-screen w-full text-3xl font-bold'>
        <h1>Gm ☕️</h1>
      </div>
    </div>
  )
}

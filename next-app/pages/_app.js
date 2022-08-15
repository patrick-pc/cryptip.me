import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { useState, useEffect } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { Toaster } from 'react-hot-toast'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL,
})

const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'cryptip.me',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function MyApp({ Component, pageProps }) {
  const [showing, setShowing] = useState(false)

  useEffect(() => {
    setShowing(true)
  }, [])

  if (!showing) {
    return null
  }

  if (typeof window === 'undefined') {
    return <></>
  } else {
    return (
      <ApolloProvider client={client}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Head>
              <title>cryptip.me</title>
              <meta
                name='description'
                content='The friendly way to accept tips in ETH.'
              />
              <meta
                name='viewport'
                content='width=device-width, initial-scale=1, maximum-scale=1'
              />
              <link rel='icon' href='/ethereum.png' />
            </Head>
            <div className='min-h-screen w-full'>
              <Header />
              <Component {...pageProps} />
              <Footer />
            </div>
            <Toaster />
          </RainbowKitProvider>
        </WagmiConfig>
      </ApolloProvider>
    )
  }
}

export default MyApp

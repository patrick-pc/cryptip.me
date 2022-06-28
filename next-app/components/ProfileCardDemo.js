import { validateAddress } from '../utils/validateAddress'
import { copyAddress } from '../utils/copyAddress'
import { shortenAddress } from '../utils/shortenAddress'
import Avatar from './Avatar'
import CurrencyInput from 'react-currency-input-field'
import toast from 'react-hot-toast'

const ProfileCardDemo = () => {
  const { address, ensName } = validateAddress('web3slinger.eth')

  const sendTipDemo = () => {
    toast('This is a demo.', {
      icon: '🎉',
    })
  }

  return (
    <div className='flex flex-col items-center justify-center bg-base-100 rounded-box shadow-xl gap-4 m-4 p-6 pt-12'>
      <Avatar address={address} size={100} squircle={true} />

      <div className='flex flex-col'>
        {address && !ensName ? (
          <div
            className='cursor-pointer tooltip tooltip-bottom'
            data-tip='Copy to clipboard'
            onClick={() => {
              copyAddress(address)
            }}
          >
            <h1 className='text-xl font-bold'>{shortenAddress(address)}</h1>
          </div>
        ) : (
          <>
            <h1 className='text-2xl font-bold mb-2'>{ensName}</h1>
            <div
              className='cursor-pointer tooltip tooltip-bottom'
              data-tip='Copy to clipboard'
              onClick={() => {
                copyAddress(address)
              }}
            >
              <span className='bg-base-200 rounded-md text-xs font-mono py-1 px-2'>
                {shortenAddress(address)}
              </span>
            </div>
          </>
        )}
      </div>

      <form
        className='flex flex-col gap-4'
        onSubmit={(e) => e.preventDefault()}
      >
        <CurrencyInput
          className='text-center text-5xl text-black font-extrabold bg-base-100 w-full focus:outline-none my-4'
          prefix='Ξ'
          defaultValue={'0.01'}
          decimalsLimit={18}
        />
        <button
          onClick={sendTipDemo}
          className='btn btn-block btn-lg bg-black rounded-box text-sm'
        >
          Send Tip
        </button>
        <input
          type='text'
          placeholder='Name (optional)'
          className='input input-bordered w-full focus:outline-none'
          maxLength={20}
        />
        <textarea
          className='textarea input-bordered w-full focus:outline-none'
          placeholder='Message (optional)'
          maxLength={150}
        ></textarea>
      </form>
    </div>
  )
}

export default ProfileCardDemo

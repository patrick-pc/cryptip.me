import toast from 'react-hot-toast'

export const copyAddress = (address) => {
  navigator.clipboard.writeText(address)
  toast.success('Copied address to clipboard.')
}

import { useEnsAddress, useEnsName } from 'wagmi'

export const validateAddress = (address) => {
  const { data: validAddress } = useEnsAddress({
    name: address,
  })
  const { data: ensName } = useEnsName({
    address: validAddress,
  })

  return { validAddress, ensName }
}

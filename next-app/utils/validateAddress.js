import { useEnsAddress, useEnsName } from 'wagmi'

export const validateAddress = (string) => {
  const { data: address } = useEnsAddress({
    name: string,
  })
  const { data: ensName } = useEnsName({
    address: address,
  })

  return { address, ensName }
}

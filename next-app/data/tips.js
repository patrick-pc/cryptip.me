import { gql, useQuery } from '@apollo/client'

export const getTips = ({ address, limit }) => {
  const query = `
    {
      tips(
        ${limit ? `first: ${limit}` : ''}
        where: { receiver: "${address}" }
        orderBy: timestamp
        orderDirection: desc
      ) {
        id
        receiver
        sender
        amount
        timestamp
        name
        message
        txHash
      }
    }
  `

  return useQuery(gql(query))
}

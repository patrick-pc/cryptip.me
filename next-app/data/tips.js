import { gql, useQuery } from '@apollo/client'

export const getTips = ({ address }) => {
  const query = `
    {
      tips(
        first: 10
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
      }
    }
  `

  // return gql(query)
  return useQuery(gql(query))
}

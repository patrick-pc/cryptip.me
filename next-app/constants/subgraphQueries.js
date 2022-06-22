import { gql } from '@apollo/client'

export const GET_TIPS = ({ address }) => {
  const query = `
    {
      tips(
        first: 5
        where: { receiver: "${address}" }
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

  return gql(query)
}

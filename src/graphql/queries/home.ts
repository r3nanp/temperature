import { gql } from '@apollo/client'

export const QUERY_TEMPERATURES = gql`
  query {
    temperatures {
      id
      from
      to
      multiplier
      offset
      offset_add
    }
  }
`

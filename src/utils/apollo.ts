import { HttpLink, ApolloClient, NormalizedCacheObject } from '@apollo/client'
import apolloCache from './apolloCache'

let apolloClient: ApolloClient<NormalizedCacheObject | null>

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: `${process.env.BASE_URL}/graphql`,
  })

  return new ApolloClient({
    cache: apolloCache,
    link: httpLink,
    ssrMode: typeof window === 'undefined',
  })
}

export const initializeApollo = (initialState = null) => {
  const apolloClientGlobal = apolloClient ?? createApolloClient()

  if (initialState) {
    apolloClientGlobal.cache.restore(initialState)
  }

  if (typeof window === 'undefined') return apolloClientGlobal

  apolloClient = apolloClient ?? apolloClientGlobal

  return apolloClient
}

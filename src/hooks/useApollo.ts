import { useMemo } from 'react'
import { initializeApollo } from 'utils/apollo'

export const useApollo = (initialState = null) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState])

  return store
}

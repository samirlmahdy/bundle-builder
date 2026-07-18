import { useEffect, useState } from 'react'
import { getCatalog } from '../api/getCatalog'
import type { BundleCatalog } from '../model/types'

type CatalogState = {
  catalog: BundleCatalog | null
  error: string | null
  isLoading: boolean
}

const initialState: CatalogState = {
  catalog: null,
  error: null,
  isLoading: true,
}

export function useCatalog() {
  const [state, setState] = useState<CatalogState>(initialState)

  useEffect(() => {
    const controller = new AbortController()

    getCatalog(controller.signal)
      .then((catalog) => {
        setState({ catalog, error: null, isLoading: false })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return

        setState({
          catalog: null,
          error:
            error instanceof Error ? error.message : 'Unable to load catalog',
          isLoading: false,
        })
      })

    return () => controller.abort()
  }, [])

  return state
}

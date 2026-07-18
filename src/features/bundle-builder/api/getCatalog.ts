import type { BundleCatalog } from '../model/types'

function isBundleCatalog(value: unknown): value is BundleCatalog {
  if (typeof value !== 'object' || value === null) return false

  const candidate = value as Partial<BundleCatalog>
  return Array.isArray(candidate.steps) && Array.isArray(candidate.fixedItems)
}

export async function getCatalog(signal?: AbortSignal) {
  const response = await fetch('/api/catalog', {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Unable to load catalog (${response.status})`)
  }

  const catalog: unknown = await response.json()
  if (!isBundleCatalog(catalog)) {
    throw new Error('The catalog response has an invalid format')
  }

  return catalog
}

import type { BundleCatalog, Product, SavedConfiguration } from './types'

export const storageKey = 'wyze-bundle-configuration'

export function getCameras(catalog: BundleCatalog): Product[] {
  return catalog.steps.flatMap((step) => step.products)
}

export function createDefaultConfiguration(
  catalog: BundleCatalog,
): SavedConfiguration {
  const cameras = getCameras(catalog)

  return {
    quantities: {
      'cam-v4:white': 1,
      'cam-pan-v3:white': 2,
    },
    activeVariants: Object.fromEntries(
      cameras
        .filter((product) => product.variants?.length)
        .map((product) => [product.id, product.variants![0].id]),
    ),
    fixedQuantities: Object.fromEntries(
      catalog.fixedItems.map((item) => [item.id, item.quantity]),
    ),
  }
}

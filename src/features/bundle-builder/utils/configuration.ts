import type { FixedItem, Product, SavedConfiguration } from '../model/types'

export function quantityKey(product: Product, variantId?: string) {
  return variantId ? `${product.id}:${variantId}` : product.id
}

export function synchronizeAutoIncludedItems(
  configuration: SavedConfiguration,
  fixedItems: FixedItem[],
): SavedConfiguration {
  const hasSelectedCamera = Object.values(configuration.quantities).some(
    (quantity) => quantity > 0,
  )
  const hasSelectedProduct =
    hasSelectedCamera ||
    fixedItems.some(
      (item) =>
        !item.autoIncludeWhen &&
        item.category !== 'Plan' &&
        (configuration.fixedQuantities[item.id] ?? 0) > 0,
    )
  const fixedQuantities = { ...configuration.fixedQuantities }

  fixedItems
    .filter((item) => item.autoIncludeWhen)
    .forEach((item) => {
      const shouldInclude =
        item.autoIncludeWhen === 'cameras'
          ? hasSelectedCamera
          : hasSelectedProduct
      fixedQuantities[item.id] = shouldInclude ? item.quantity : 0
    })

  return { ...configuration, fixedQuantities }
}

export function deserializeConfiguration(
  storedValue: string,
  defaultConfiguration: SavedConfiguration,
  fixedItems: FixedItem[],
): SavedConfiguration {
  const stored =
    (JSON.parse(storedValue) as Partial<SavedConfiguration> | null) ?? {}

  return synchronizeAutoIncludedItems(
    {
      quantities: {
        ...defaultConfiguration.quantities,
        ...stored.quantities,
      },
      activeVariants: {
        ...defaultConfiguration.activeVariants,
        ...stored.activeVariants,
      },
      fixedQuantities: {
        ...defaultConfiguration.fixedQuantities,
        ...stored.fixedQuantities,
      },
    },
    fixedItems,
  )
}

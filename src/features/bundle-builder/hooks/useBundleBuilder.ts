import { useMemo, useState } from 'react'
import {
  createDefaultConfiguration,
  getCameras,
  storageKey,
} from '../model/catalog'
import type {
  BundleCatalog,
  FixedItem,
  Product,
  SavedConfiguration,
} from '../model/types'
import {
  deserializeConfiguration,
  quantityKey,
  synchronizeAutoIncludedItems,
} from '../utils/configuration'
import { calculateTotals, createCameraLines } from '../utils/pricing'
import { useLocalStorage } from './useLocalStorage'

export function useBundleBuilder(catalog: BundleCatalog) {
  const cameras = useMemo(() => getCameras(catalog), [catalog])
  const fixedItems = catalog.fixedItems
  const defaultConfiguration = useMemo(
    () => createDefaultConfiguration(catalog),
    [catalog],
  )
  const [configuration, setConfiguration] = useLocalStorage<SavedConfiguration>(
    storageKey,
    () => synchronizeAutoIncludedItems(defaultConfiguration, fixedItems),
    (storedValue) =>
      deserializeConfiguration(storedValue, defaultConfiguration, fixedItems),
  )
  const [openStep, setOpenStep] = useState<number | null>(0)
  const [saved, setSaved] = useState(false)

  const activeVariant = (product: Product) =>
    product.variants?.find(
      (variant) => variant.id === configuration.activeVariants[product.id],
    ) ?? product.variants?.[0]

  const setProductQuantity = (
    product: Product,
    value: number,
    variantId?: string,
  ) => {
    const key = quantityKey(product, variantId)
    setConfiguration((current) =>
      synchronizeAutoIncludedItems(
        {
          ...current,
          quantities: { ...current.quantities, [key]: value },
        },
        fixedItems,
      ),
    )
    setSaved(false)
  }

  const setFixedQuantity = (item: FixedItem, value: number) => {
    setConfiguration((current) =>
      synchronizeAutoIncludedItems(
        {
          ...current,
          fixedQuantities: { ...current.fixedQuantities, [item.id]: value },
        },
        fixedItems,
      ),
    )
    setSaved(false)
  }

  const setActiveVariant = (product: Product, variantId: string) => {
    setConfiguration((current) => ({
      ...current,
      activeVariants: {
        ...current.activeVariants,
        [product.id]: variantId,
      },
    }))
    setSaved(false)
  }

  const selectedCounts = useMemo(
    () =>
      Object.fromEntries(
        catalog.steps.map((step) => {
          const selectedProducts = step.products.filter((product) => {
            if (!product.variants) {
              return (configuration.quantities[product.id] ?? 0) > 0
            }

            return product.variants.some(
              (variant) =>
                (configuration.quantities[quantityKey(product, variant.id)] ??
                  0) > 0,
            )
          }).length
          const selectedFixedItems = fixedItems.filter(
            (item) =>
              step.fixedCategories?.includes(item.category) &&
              (configuration.fixedQuantities[item.id] ?? 0) > 0,
          ).length

          return [step.id, selectedProducts + selectedFixedItems]
        }),
      ),
    [
      catalog.steps,
      configuration.fixedQuantities,
      configuration.quantities,
      fixedItems,
    ],
  )

  const cameraLines = useMemo(
    () => createCameraLines(cameras, configuration.quantities),
    [cameras, configuration.quantities],
  )

  const totals = useMemo(
    () =>
      calculateTotals(cameraLines, fixedItems, configuration.fixedQuantities),
    [cameraLines, configuration.fixedQuantities, fixedItems],
  )

  const confirmConfigurationSaved = () => {
    setSaved(true)
  }

  return {
    activeVariant,
    cameraLines,
    configuration,
    openStep,
    confirmConfigurationSaved,
    saved,
    selectedCounts,
    setActiveVariant,
    setFixedQuantity,
    setOpenStep,
    setProductQuantity,
    totals,
  }
}

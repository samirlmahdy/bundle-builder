import type {
  BundleTotals,
  FixedItem,
  Product,
  ReviewLine,
  SavedConfiguration,
} from '../model/types'

export function money(value: number) {
  return `$${value.toFixed(2)}`
}

export function createCameraLines(
  products: Product[],
  quantities: SavedConfiguration['quantities'],
): ReviewLine[] {
  return products.flatMap<ReviewLine>((product) => {
    if (!product.variants) {
      const quantity = quantities[product.id] ?? 0
      return quantity ? [{ product, quantity }] : []
    }

    const positive = product.variants.filter(
      (variant) => (quantities[`${product.id}:${variant.id}`] ?? 0) > 0,
    )

    return positive.map((variant) => ({
      product,
      variant,
      quantity: quantities[`${product.id}:${variant.id}`] ?? 0,
      showVariant: positive.length > 1,
    }))
  })
}

export function calculateTotals(
  cameraLines: ReviewLine[],
  fixedItems: FixedItem[],
  fixedQuantities: SavedConfiguration['fixedQuantities'],
): BundleTotals {
  const productTotal = cameraLines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  )
  const productCompareTotal = cameraLines.reduce(
    (sum, line) =>
      sum + (line.product.compareAt ?? line.product.price) * line.quantity,
    0,
  )
  const fixedTotal = fixedItems.reduce(
    (sum, item) => sum + item.price * (fixedQuantities[item.id] ?? 0),
    0,
  )
  const fixedCompareTotal = fixedItems.reduce(
    (sum, item) =>
      sum +
      (item.compareAt ?? item.price) * (fixedQuantities[item.id] ?? 0),
    0,
  )
  const total = productTotal + fixedTotal
  const compareTotal = productCompareTotal + fixedCompareTotal

  return {
    total,
    compareTotal,
    savings: compareTotal - total,
  }
}

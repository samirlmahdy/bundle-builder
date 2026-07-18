import type { Product, SavedConfiguration, Variant } from '../model/types'
import { quantityKey } from '../utils/configuration'
import { ProductCard } from './ProductCard'

type CameraProductGridProps = {
  products: Product[]
  configuration: SavedConfiguration
  activeVariant: (product: Product) => Variant | undefined
  onQuantityChange: (
    product: Product,
    value: number,
    variantId?: string,
  ) => void
  onVariantChange: (product: Product, variantId: string) => void
}

export function CameraProductGrid({
  products,
  configuration,
  activeVariant,
  onQuantityChange,
  onVariantChange,
}: CameraProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => {
        const variant = activeVariant(product)
        const key = quantityKey(product, variant?.id)
        const quantity = configuration.quantities[key] ?? 0
        const isSelected = product.variants
          ? product.variants.some(
              (option) =>
                (configuration.quantities[quantityKey(product, option.id)] ??
                  0) > 0,
            )
          : quantity > 0

        return (
          <ProductCard
            product={product}
            variant={variant}
            quantity={quantity}
            isSelected={isSelected}
            key={product.id}
            onQuantityChange={(value) =>
              onQuantityChange(product, value, variant?.id)
            }
            onVariantChange={(variantId) => onVariantChange(product, variantId)}
          />
        )
      })}
    </div>
  )
}

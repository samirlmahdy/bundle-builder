import { useState } from 'react'
import type { Product, Variant } from '../model/types'
import { money } from '../utils/pricing'
import { ProductDetailsModal } from './ProductDetailsModal'
import { QuantityStepper } from './QuantityStepper'

type ProductCardProps = {
  product: Product
  variant?: Variant
  quantity: number
  isSelected: boolean
  onQuantityChange: (value: number) => void
  onVariantChange: (variantId: string) => void
}

export function ProductCard({
  product,
  variant,
  quantity,
  isSelected,
  onQuantityChange,
  onVariantChange,
}: ProductCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  return (
    <>
      <article className={`product-card ${isSelected ? 'selected' : ''}`}>
        <div className="product-visual">
          {product.badge && <span className="discount">{product.badge}</span>}
          <img src={variant?.displayImage ?? product.image} alt="" />
        </div>
        <div className="product-info">
          <div>
            <h3>{product.name}</h3>
            <p>
              {product.description}{' '}
              <button
                className="product-learn-more"
                type="button"
                aria-haspopup="dialog"
                onClick={() => setIsDetailsOpen(true)}
              >
                Learn More
              </button>
            </p>
          </div>
          {product.variants && (
            <div className="variants" aria-label={`${product.name} color`}>
              {product.variants.map((option) => (
                <button
                  className={option.id === variant?.id ? 'active' : ''}
                  type="button"
                  key={option.id}
                  aria-pressed={option.id === variant?.id}
                  onClick={() => onVariantChange(option.id)}
                >
                  <img src={option.image} alt="" />
                  {option.label}
                </button>
              ))}
            </div>
          )}
          <div className="product-footer">
            <QuantityStepper
              value={quantity}
              onChange={onQuantityChange}
              label={`${product.name}${variant ? ` ${variant.label}` : ''}`}
            />
            <div className="card-price">
              {product.compareAt && <s>{money(product.compareAt)}</s>}
              <span>{money(product.price)}</span>
            </div>
          </div>
        </div>
      </article>
      <ProductDetailsModal
        product={product}
        variant={variant}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </>
  )
}

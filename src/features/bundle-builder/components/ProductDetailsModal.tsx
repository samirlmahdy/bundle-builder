import { useEffect, useRef } from 'react'
import type { Product, Variant } from '../model/types'
import { money } from '../utils/pricing'

type ProductDetailsModalProps = {
  product: Product
  variant?: Variant
  isOpen: boolean
  onClose: () => void
}

export function ProductDetailsModal({
  product,
  variant,
  isOpen,
  onClose,
}: ProductDetailsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = `product-details-${product.id}`

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      className="product-modal"
      aria-labelledby={titleId}
      onCancel={onClose}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="product-modal-card">
        <button className="product-modal-close" type="button" onClick={onClose}>
          Close
        </button>

        <div className="product-modal-visual">
          {product.badge && (
            <span className="product-modal-badge">{product.badge}</span>
          )}
          <img src={variant?.displayImage ?? product.image} alt="" />
          {variant && (
            <span className="product-modal-variant">
              <span aria-hidden="true" />
              {variant.label}
            </span>
          )}
        </div>

        <div className="product-modal-content">
          <p className="product-modal-eyebrow">Product details</p>
          <h2 id={titleId}>{product.name}</h2>
          <p className="product-modal-overview">{product.details.overview}</p>

          <div className="product-modal-price">
            <span>Bundle price</span>
            <p>
              {product.compareAt && <s>{money(product.compareAt)}</s>}
              <strong>{money(product.price)}</strong>
            </p>
          </div>

          <section className="product-modal-section">
            <h3>Why you’ll love it</h3>
            <ul className="product-modal-highlights">
              {product.details.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>

          <section className="product-modal-section">
            <h3>At a glance</h3>
            <dl className="product-modal-specifications">
              {product.details.specifications.map((specification) => (
                <div key={specification.label}>
                  <dt>{specification.label}</dt>
                  <dd>{specification.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="product-modal-section product-modal-included">
            <h3>What’s in the box</h3>
            <p>{product.details.included.join(' · ')}</p>
          </section>
        </div>
      </div>
    </dialog>
  )
}

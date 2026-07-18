import type { Product, ReviewLine } from '../model/types'
import { quantityKey } from '../utils/configuration'
import { money } from '../utils/pricing'
import { QuantityStepper } from './QuantityStepper'
import { ReviewGroup } from './ReviewGroup'

type CameraReviewGroupProps = {
  lines: ReviewLine[]
  onQuantityChange: (
    product: Product,
    value: number,
    variantId?: string,
  ) => void
}

export function CameraReviewGroup({
  lines,
  onQuantityChange,
}: CameraReviewGroupProps) {
  return (
    <ReviewGroup title="Cameras">
      {lines.map((line) => {
        const key = quantityKey(line.product, line.variant?.id)

        return (
          <div className="review-line" key={key}>
            <img
              src={line.variant?.displayImage ?? line.product.image}
              alt=""
            />
            <p>
              {line.product.name}
              {line.showVariant ? ` — ${line.variant?.label}` : ''}
            </p>
            <QuantityStepper
              value={line.quantity}
              onChange={(value) =>
                onQuantityChange(line.product, value, line.variant?.id)
              }
              label={line.product.name}
            />
            <div className="line-price">
              {line.product.compareAt && (
                <s>{money(line.product.compareAt * line.quantity)}</s>
              )}
              <strong>{money(line.product.price * line.quantity)}</strong>
            </div>
          </div>
        )
      })}
    </ReviewGroup>
  )
}

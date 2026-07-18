import type { FixedItem, SavedConfiguration } from '../model/types'
import { money } from '../utils/pricing'
import { QuantityStepper } from './QuantityStepper'
import { ReviewGroup } from './ReviewGroup'

type FixedItemReviewGroupProps = {
  category: string
  items: FixedItem[]
  configuration: SavedConfiguration
  onQuantityChange: (item: FixedItem, value: number) => void
}

export function FixedItemReviewGroup({
  category,
  items,
  configuration,
  onQuantityChange,
}: FixedItemReviewGroupProps) {
  const isPlan = category === 'Plan'

  return (
    <ReviewGroup title={category}>
      {items.map((item) => {
        const quantity = configuration.fixedQuantities[item.id] ?? 0

        return (
          <div
            className={`review-line ${isPlan ? 'review-line-plan' : ''}`}
            key={item.id}
          >
            <div
              className={`review-image review-image-${item.id} ${
                isPlan ? 'plan-icon' : ''
              }`}
            >
              <img src={item.image} alt="" />
            </div>
            <p className={item.accentText ? 'accented-name' : undefined}>
              {item.accentText ? (
                <>
                  {item.name.replace(item.accentText, '')}
                  <strong>{item.accentText}</strong>
                </>
              ) : (
                item.name
              )}
            </p>
            {!isPlan && (
              <QuantityStepper
                value={quantity}
                minimum={item.required ? 1 : 0}
                disabled={Boolean(item.autoIncludeWhen)}
                onChange={(value) => onQuantityChange(item, value)}
                label={item.name}
              />
            )}
            <div className="line-price">
              {item.compareAt && <s>{money(item.compareAt * quantity)}{item.monthly ? '/mo' : ''}</s>}
              <strong>
                {item.price === 0
                  ? 'FREE'
                  : `${money(item.price * quantity)}${item.monthly ? '/mo' : ''}`}
              </strong>
            </div>
          </div>
        )
      })}
    </ReviewGroup>
  )
}

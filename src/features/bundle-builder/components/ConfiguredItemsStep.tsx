import type { FixedItem, SavedConfiguration } from '../model/types'
import { money } from '../utils/pricing'
import { QuantityStepper } from './QuantityStepper'

type ConfiguredItemsStepProps = {
  items: FixedItem[]
  configuration: SavedConfiguration
  onQuantityChange: (item: FixedItem, value: number) => void
}

export function ConfiguredItemsStep({
  items,
  configuration,
  onQuantityChange,
}: ConfiguredItemsStepProps) {
  return (
    <div className="configured-items">
      {items
        .filter(
          (item) =>
            !item.autoIncludeWhen ||
            (configuration.fixedQuantities[item.id] ?? 0) > 0,
        )
        .map((item) => {
          const quantity = configuration.fixedQuantities[item.id] ?? 0
          const price = item.price * quantity
          const compareAt = item.compareAt
            ? item.compareAt * quantity
            : undefined

          return (
            <article
              className={`configured-item ${quantity > 0 ? 'selected' : ''}`}
              key={item.id}
            >
              <div
                className={`configured-item-image ${!item.image ? 'plan-icon' : ''}`}
              >
                {item.image ? (
                  <img src={item.image} alt="" />
                ) : (
                  <span aria-hidden="true">♡</span>
                )}
              </div>
              <div className="configured-item-details">
                <h3>{item.name}</h3>
                <p>
                  {item.autoIncludeWhen
                    ? item.autoIncludeWhen === 'cameras'
                      ? 'Automatically included when cameras are selected.'
                      : 'Automatically included with your configured products.'
                    : item.required
                      ? 'Included in your configured system.'
                      : 'Adjust the quantity for your system.'}
                </p>
              </div>
              <QuantityStepper
                value={quantity}
                minimum={item.required ? 1 : 0}
                disabled={Boolean(item.autoIncludeWhen)}
                onChange={(value) => onQuantityChange(item, value)}
                label={item.name}
              />
              <div className="card-price">
                {compareAt !== undefined && <s>{money(compareAt)}</s>}
                <span>
                  {price === 0
                    ? 'FREE'
                    : `${money(price)}${item.monthly ? '/mo' : ''}`}
                </span>
              </div>
            </article>
          )
        })}
    </div>
  )
}

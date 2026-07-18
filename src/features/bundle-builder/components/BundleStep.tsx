import type {
  BundleStep as BundleStepData,
  FixedItem,
  Product,
  SavedConfiguration,
  Variant,
} from '../model/types'
import { CameraProductGrid } from './CameraProductGrid'
import { ConfiguredItemsStep } from './ConfiguredItemsStep'
import { Icon } from './Icon'

type BundleStepProps = {
  step: BundleStepData
  stepNumber: number
  stepCount: number
  isOpen: boolean
  selectedCount: number
  configuredItems: FixedItem[]
  configuration: SavedConfiguration
  activeVariant: (product: Product) => Variant | undefined
  onToggle: () => void
  onNext: () => void
  onProductQuantityChange: (
    product: Product,
    value: number,
    variantId?: string,
  ) => void
  onFixedQuantityChange: (item: FixedItem, value: number) => void
  onVariantChange: (product: Product, variantId: string) => void
}

export function BundleStep({
  step,
  stepNumber,
  stepCount,
  isOpen,
  selectedCount,
  configuredItems,
  configuration,
  activeVariant,
  onToggle,
  onNext,
  onProductQuantityChange,
  onFixedQuantityChange,
  onVariantChange,
}: BundleStepProps) {
  const buttonId = `bundle-step-${step.id}-button`
  const panelId = `bundle-step-${step.id}-panel`

  return (
    <article className={`accordion-step ${isOpen ? 'is-open' : ''}`}>
      <p className="eyebrow">
        Step {stepNumber} of {stepCount}
      </p>
      <button
        className="step-header"
        id={buttonId}
        type="button"
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <Icon name={step.icon} className={`step-icon step-icon-${step.icon}`} />
        <span>{step.title}</span>
        <span className="step-state">
          <span aria-live="polite" aria-atomic="true">
            {isOpen ? `${selectedCount} selected` : ''}
          </span>
          <span
            className={`chevron ${isOpen ? 'is-open' : ''}`}
            aria-hidden="true"
          >
            ▼
          </span>
        </span>
      </button>
      <div
        className={`step-content-shell ${isOpen ? 'is-open' : ''}`}
        id={panelId}
        role="region"
        aria-hidden={!isOpen}
        aria-labelledby={buttonId}
      >
        <div className="step-content">
          {step.products.length > 0 ? (
            <CameraProductGrid
              products={step.products}
              configuration={configuration}
              activeVariant={activeVariant}
              onQuantityChange={onProductQuantityChange}
              onVariantChange={onVariantChange}
            />
          ) : (
            <ConfiguredItemsStep
              items={configuredItems}
              configuration={configuration}
              onQuantityChange={onFixedQuantityChange}
            />
          )}
          <button className="next-button" type="button" onClick={onNext}>
            Next: {step.nextLabel}
          </button>
        </div>
      </div>
    </article>
  )
}

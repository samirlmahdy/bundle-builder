import type {
  BundleCatalog,
  FixedItem,
  Product,
  SavedConfiguration,
  Variant,
} from '../model/types'
import { BundleStep } from './BundleStep'

type BundleStepsProps = {
  catalog: BundleCatalog
  configuration: SavedConfiguration
  openStep: number | null
  selectedCounts: Record<string, number>
  activeVariant: (product: Product) => Variant | undefined
  onOpenStep: (index: number | null) => void
  onProductQuantityChange: (
    product: Product,
    value: number,
    variantId?: string,
  ) => void
  onFixedQuantityChange: (item: FixedItem, value: number) => void
  onVariantChange: (product: Product, variantId: string) => void
}

export function BundleSteps({
  catalog,
  configuration,
  openStep,
  selectedCounts,
  activeVariant,
  onOpenStep,
  onProductQuantityChange,
  onFixedQuantityChange,
  onVariantChange,
}: BundleStepsProps) {
  const stepCount = catalog.steps.length
  const lastStepIndex = stepCount - 1

  return (
    <section className="builder" aria-label="Build your security system">
      {catalog.steps.map((step, index) => (
        <BundleStep
          key={step.id}
          step={step}
          stepNumber={index + 1}
          stepCount={stepCount}
          isOpen={openStep === index}
          selectedCount={selectedCounts[step.id] ?? 0}
          configuredItems={catalog.fixedItems.filter((item) =>
            step.fixedCategories?.includes(item.category),
          )}
          configuration={configuration}
          activeVariant={activeVariant}
          onToggle={() => onOpenStep(openStep === index ? null : index)}
          onNext={() => onOpenStep(index === lastStepIndex ? null : index + 1)}
          onProductQuantityChange={onProductQuantityChange}
          onFixedQuantityChange={onFixedQuantityChange}
          onVariantChange={onVariantChange}
        />
      ))}
    </section>
  )
}

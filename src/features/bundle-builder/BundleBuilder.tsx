import { BundleSteps } from './components/BundleSteps'
import { ReviewPanel } from './components/ReviewPanel'
import { useBundleBuilder } from './hooks/useBundleBuilder'
import { useCatalog } from './hooks/useCatalog'
import type { BundleCatalog } from './model/types'
import './bundle-builder.css'

export function BundleBuilder() {
  const { catalog, error, isLoading } = useCatalog()

  if (isLoading) {
    return (
      <main className="bundle-status" aria-live="polite">
        Loading your bundle options…
      </main>
    )
  }

  if (error || !catalog) {
    return (
      <main className="bundle-status bundle-status-error" role="alert">
        <strong>We couldn’t load the bundle options.</strong>
        <span>{error ?? 'Please try again later.'}</span>
      </main>
    )
  }

  return <BundleBuilderContent catalog={catalog} />
}

type BundleBuilderContentProps = {
  catalog: BundleCatalog
}

function BundleBuilderContent({ catalog }: BundleBuilderContentProps) {
  const builder = useBundleBuilder(catalog)

  return (
    <main className="bundle-page">
      <h1 className="visually-hidden">Build your Wyze home security system</h1>
      <BundleSteps
        catalog={catalog}
        configuration={builder.configuration}
        openStep={builder.openStep}
        selectedCounts={builder.selectedCounts}
        activeVariant={builder.activeVariant}
        onOpenStep={builder.setOpenStep}
        onProductQuantityChange={builder.setProductQuantity}
        onFixedQuantityChange={builder.setFixedQuantity}
        onVariantChange={builder.setActiveVariant}
      />
      <ReviewPanel
        catalog={catalog}
        cameraLines={builder.cameraLines}
        configuration={builder.configuration}
        totals={builder.totals}
        saved={builder.saved}
        onProductQuantityChange={builder.setProductQuantity}
        onFixedQuantityChange={builder.setFixedQuantity}
        onSave={builder.confirmConfigurationSaved}
      />
    </main>
  )
}

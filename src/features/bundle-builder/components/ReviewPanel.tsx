import { motion, useReducedMotion } from 'motion/react'
import type {
  BundleCatalog,
  BundleTotals,
  FixedItem,
  Product,
  ReviewLine,
  SavedConfiguration,
} from '../model/types'
import { CameraReviewGroup } from './CameraReviewGroup'
import { FixedItemReviewGroup } from './FixedItemReviewGroup'
import { ReviewHeader } from './ReviewHeader'
import { ReviewShipping } from './ReviewShipping'
import { ReviewSummary } from './ReviewSummary'

type ReviewPanelProps = {
  catalog: BundleCatalog
  cameraLines: ReviewLine[]
  configuration: SavedConfiguration
  totals: BundleTotals
  saved: boolean
  onProductQuantityChange: (
    product: Product,
    value: number,
    variantId?: string,
  ) => void
  onFixedQuantityChange: (item: FixedItem, value: number) => void
  onSave: () => void
}

const reviewCategories = ['Sensors', 'Accessories', 'Plan']

export function ReviewPanel({
  catalog,
  cameraLines,
  configuration,
  totals,
  saved,
  onProductQuantityChange,
  onFixedQuantityChange,
  onSave,
}: ReviewPanelProps) {
  const shouldReduceMotion = useReducedMotion()
  const selectedFixedItems = catalog.fixedItems.filter(
    (item) => (configuration.fixedQuantities[item.id] ?? 0) > 0,
  )
  const hasSelectedItems =
    cameraLines.length > 0 || selectedFixedItems.length > 0
  const hasShippableItems =
    cameraLines.length > 0 ||
    selectedFixedItems.some((item) => item.category !== 'Plan')

  return (
    <motion.aside
      className="review-panel"
      aria-label="Your security system"
      layout={shouldReduceMotion ? false : 'size'}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.42,
        ease: [0.22, 1, 0.36, 1],
        layout: {
          duration: shouldReduceMotion ? 0 : 0.32,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
    >
      <p className="review-eyebrow">Review</p>
      {hasSelectedItems ? (
        <div className="review-panel-body">
          <div className="review-items">
            <ReviewHeader />
            {cameraLines.length > 0 && (
              <CameraReviewGroup
                lines={cameraLines}
                onQuantityChange={onProductQuantityChange}
              />
            )}
            {reviewCategories.map((category) => {
              const categoryItems = selectedFixedItems.filter(
                (item) => item.category === category,
              )

              if (categoryItems.length === 0) return null

              return (
                <FixedItemReviewGroup
                  key={category}
                  category={category}
                  items={categoryItems}
                  configuration={configuration}
                  onQuantityChange={onFixedQuantityChange}
                />
              )
            })}
            {hasShippableItems && <ReviewShipping />}
          </div>
          <ReviewSummary totals={totals} saved={saved} onSave={onSave} />
        </div>
      ) : (
        <>
          <ReviewHeader />

          <div className="review-empty" role="status">
            <strong>Your system is empty</strong>
            <p>
              Add a product to start building your personalized security system.
            </p>
          </div>
        </>
      )}
    </motion.aside>
  )
}

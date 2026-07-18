import type { BundleTotals } from '../model/types'
import { money } from '../utils/pricing'

type ReviewSummaryProps = {
  totals: BundleTotals
  saved: boolean
  onSave: () => void
}

export function ReviewSummary({ totals, saved, onSave }: ReviewSummaryProps) {
  return (
    <div className="review-summary">
      <div className="total-row">
        <div className="guarantee">
          <img
            src="/assets/satisfaction.png"
            alt="100% satisfaction guarantee"
          />
          <div className="guarantee-copy">
            <strong>30-day hassle-free returns</strong>
            <p>
              If you’re not totally in love with the products, we’ll refund you
              100%.
            </p>
          </div>
        </div>
        <div className="total-pricing" aria-live="polite" aria-atomic="true">
          <small>as low as {money(totals.total / 10)}/mo</small>
          <p>
            <s>{money(totals.compareTotal)}</s>{' '}
            <strong>{money(totals.total)}</strong>
          </p>
        </div>
      </div>
      <p className="savings">
        Congrats! You’re saving {money(totals.savings)} on your security bundle!
      </p>
      <button
        className="checkout"
        type="button"
        onClick={() => window.alert('Your system is ready for checkout!')}
      >
        Checkout
      </button>
      <button className="save-link" type="button" onClick={onSave}>
        <span aria-live="polite">
          {saved ? 'System saved!' : 'Save my system for later'}
        </span>
      </button>
    </div>
  )
}

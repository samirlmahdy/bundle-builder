type QuantityStepperProps = {
  value: number
  onChange: (next: number) => void
  minimum?: number
  disabled?: boolean
  label: string
}

export function QuantityStepper({
  value,
  onChange,
  minimum = 0,
  disabled = false,
  label,
}: QuantityStepperProps) {
  const decreaseDisabled = disabled || value <= minimum

  return (
    <div
      className="stepper"
      aria-label={label}
      aria-disabled={disabled || undefined}
    >
      <button
        type="button"
        aria-label={`Remove one ${label}`}
        disabled={decreaseDisabled}
        onClick={() => onChange(Math.max(minimum, value - 1))}
      >
        <img
          className="stepper-icon stepper-icon-minus"
          src="/assets/minus.svg"
          alt=""
        />
      </button>
      <span aria-live="polite" aria-atomic="true">
        {value}
      </span>
      <button
        type="button"
        aria-label={`Add one ${label}`}
        disabled={disabled}
        onClick={() => onChange(value + 1)}
      >
        <img
          className="stepper-icon"
          src={disabled ? '/assets/add-disabled.svg' : '/assets/add.svg'}
          alt=""
        />
      </button>
    </div>
  )
}

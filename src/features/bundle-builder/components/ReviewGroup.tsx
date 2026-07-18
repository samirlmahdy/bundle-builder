import type { ReactNode } from 'react'

type ReviewGroupProps = {
  title: string
  children: ReactNode
}

export function ReviewGroup({ title, children }: ReviewGroupProps) {
  return (
    <section className="review-group">
      <h3>{title}</h3>
      {children}
    </section>
  )
}

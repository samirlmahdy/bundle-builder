export type Variant = {
  id: string
  label: string
  image: string
  displayImage?: string
}

export type ProductSpecification = {
  label: string
  value: string
}

export type ProductDetails = {
  overview: string
  highlights: string[]
  specifications: ProductSpecification[]
  included: string[]
}

export type Product = {
  id: string
  name: string
  description: string
  image: string
  price: number
  compareAt?: number
  badge?: string
  variants?: Variant[]
  details: ProductDetails
}

export type FixedItem = {
  id: string
  category: string
  name: string
  accentText?: string
  image: string
  price: number
  compareAt?: number
  quantity: number
  required?: boolean
  autoIncludeWhen?: 'products' | 'cameras'
  monthly?: boolean
}

export type BundleStep = {
  id: string
  title: string
  icon: 'camera' | 'shield' | 'sensor' | 'dots'
  nextLabel: string
  products: Product[]
  fixedCategories?: string[]
}

export type BundleCatalog = {
  steps: BundleStep[]
  fixedItems: FixedItem[]
}

export type SavedConfiguration = {
  quantities: Record<string, number>
  activeVariants: Record<string, string>
  fixedQuantities: Record<string, number>
}

export type ReviewLine = {
  product: Product
  quantity: number
  variant?: Variant
  showVariant?: boolean
}

export type BundleTotals = {
  total: number
  compareTotal: number
  savings: number
}

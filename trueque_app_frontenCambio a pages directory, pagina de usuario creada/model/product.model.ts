import { Category } from './category.model'

export enum State {
  ACTIVE = 'VISIBLE',
  HIDDEN = 'HIDDEN',
  DELETED = 'DELETED',
}

export interface Product {
  code: string
  state: State
  title: string
  description: string
  price: string
  imageUrl: string
  created_at: Date
  category: Category
}

export interface CreateProductProps {
  title: string
  description: string
  price: string
  categoryCode: string
  image: File
}

import { Category } from './category.model'
import { Review } from './review.model'
import { User } from './user.model'

export enum State {
  VISIBLE = 'VISIBLE',
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
  reviews: Review[]
  user: User
}

export interface CreateProductProps {
  title: string
  description: string
  price: string
  categoryCode: string
  image: File
}

export interface UpdateProductProps {
  title?: string
  description?: string
  price?: string
  category?: string
  state?: State
}

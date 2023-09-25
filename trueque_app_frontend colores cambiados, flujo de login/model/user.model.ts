import { Product } from './product.model'

export interface User {
  code: string
  role: Role
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  created_at: Date
  updated_at: Date
  products?: Product[]
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

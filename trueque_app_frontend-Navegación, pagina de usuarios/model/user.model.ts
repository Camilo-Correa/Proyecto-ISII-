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
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

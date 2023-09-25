export interface User {
  code: string
  role: Role
  name: string
  email: string
  created_at: Date
  updated_at: Date
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

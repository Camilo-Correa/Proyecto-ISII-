
import { Request } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'

export function generateToken(payload: { code: string }): string {
  return jwt.sign(payload, JWT_SECRET)
}

export function verifyToken(token: string): JwtPayload | string | null {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return null
  }
}

export function getToken(req: Request): string | null {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  return token || null
}

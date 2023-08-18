import express from 'express'
import {
  createUser,
  getUsers,
  getUserByCode,
  updateUser,
  deleteUser,
} from '../controllers/user.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

export const userRoutes = express.Router()

userRoutes.post('/register', createUser)

// Rutas protegidas que requieren autenticación
userRoutes.get('/user/', getUserByCode)
userRoutes.use(authMiddleware)
userRoutes.get('/', getUsers)
userRoutes.put('/', updateUser)
userRoutes.delete('/', deleteUser)

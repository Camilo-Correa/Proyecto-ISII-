import express from 'express'
import { loginUser } from '../controllers/login.controller'

export const authRoutes = express.Router()

authRoutes.post('/login', loginUser)

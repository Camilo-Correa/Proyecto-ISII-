import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import {
  deleteProduct,
  deleteReview,
  favoriteProduct,
  getCategories,
  getProduct,
  getProducts,
  postProduct,
  reviewProduct,
  unfavoriteProduct,
  updateProduct,
} from '../controllers/product.controller'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
})

export const productRoutes = express.Router()
productRoutes.post('/', upload.single('image'), postProduct)
productRoutes.get('/', getProducts)
productRoutes.get('/product/', getProduct)
productRoutes.get('/categories/', getCategories)
productRoutes.use(authMiddleware)
productRoutes.post('/review/', reviewProduct)
productRoutes.delete('/review/', deleteReview)
productRoutes.delete('/product/', deleteProduct)
productRoutes.put('/product/', updateProduct)
productRoutes.post('/product/favorite', favoriteProduct)
productRoutes.delete('/product/favorite', unfavoriteProduct)

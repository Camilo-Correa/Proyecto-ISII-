import { Request, Response } from 'express'
import { getToken } from '../utils/authUtils'
import { AppDataSource } from '../data-source'
import { User } from '../entities/user.entity'
import { Product, ProductState } from '../entities/product.entity'
import { Category } from '../entities/category.entity'
import { Review } from '../entities/review.entity'
import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function postProduct(req: any, res: Response) {
  try {
    const { title, description, price, categoryCode } = req.body
    const image = req.file
    if (!title || !description || !price || !categoryCode || !image)
      return res.status(400).json({ message: 'Faltan datos' })
    const authToken = getToken(req)
    const user = await AppDataSource.manager.findOne(User, {
      where: { authToken },
    })
    const product = new Product()
    product.title = title
    product.description = description
    product.price = price
    product.category = categoryCode
    const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
    const IMGUR_UPLOAD_URL = 'https://api.imgur.com/3/image'
    const imageBuffer = image.buffer.toString('base64')
    const response = await axios.post(
      IMGUR_UPLOAD_URL,
      { image: imageBuffer },
      {
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        },
      },
    )
    product.imageUrl = response.data.data.link
    product.user = user
    await AppDataSource.manager.save(product)
    delete product.user
    delete product.category
    res.json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al crear el producto' })
  }
}

export async function getProducts(req: Request, res: Response) {
  const products = await AppDataSource.manager.find(Product, {
    relations: ['reviews', 'category'],
    where: { state: ProductState.VISIBLE },
  })
  res.json(products)
}

export async function getProduct(req: Request, res: Response) {
  const { code } = req.query as { code: string }
  const token = getToken(req)
  if (!code)
    return res.status(400).json({ message: 'Falta el código del producto' })
  const product = await AppDataSource.manager.findOne(Product, {
    relations: ['reviews', 'category', 'user'],
    where: { code },
  })
  if (!product)
    return res.status(404).json({ message: 'Producto no encontrado' })
  if (token) {
    const user = await AppDataSource.manager.findOne(User, {
      where: { authToken: token },
      relations: ['favorites'],
    })
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
    const isFavorite = user.favorites.some((favorite) => favorite.code === code)
    product.isFavorite = isFavorite
  }

  res.json(product)
}

export async function favoriteProduct(req: Request, res: Response) {
  const { code } = req.query as { code: string }
  const token = getToken(req)
  if (!code)
    return res.status(400).json({ message: 'Falta el código del producto' })
  const product = await AppDataSource.manager.findOne(Product, {
    where: { code },
  })
  if (!product)
    return res.status(404).json({ message: 'Producto no encontrado' })
  const user = await AppDataSource.manager.findOne(User, {
    where: { authToken: token },
    relations: ['favorites'],
  })
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
  user.favorites.push(product)
  await AppDataSource.manager.save(user)
  res.json(product)
}

export async function unfavoriteProduct(req: Request, res: Response) {
  const { code } = req.query as { code: string }
  const token = getToken(req)
  if (!code)
    return res.status(400).json({ message: 'Falta el código del producto' })
  const product = await AppDataSource.manager.findOne(Product, {
    where: { code },
  })
  if (!product)
    return res.status(404).json({ message: 'Producto no encontrado' })
  const user = await AppDataSource.manager.findOne(User, {
    where: { authToken: token },
    relations: ['favorites'],
  })
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
  user.favorites = user.favorites.filter((favorite) => favorite.code !== code)
  await AppDataSource.manager.save(user)
  res.json(product)
}

export async function deleteProduct(req: Request, res: Response) {
  const { code } = req.query as { code: string }
  if (!code)
    return res.status(400).json({ message: 'Falta el código del producto' })
  const product = await AppDataSource.manager.findOne(Product, {
    where: { code },
  })
  if (!product)
    return res.status(404).json({ message: 'Producto no encontrado' })
  product.state = ProductState.DELETED
  await AppDataSource.manager.save(product)
  res.json(product)
}

export async function updateProduct(req: Request, res: Response) {
  const { code } = req.query as { code: string }
  if (!code)
    return res.status(400).json({ message: 'Falta el código del producto' })
  const product = await AppDataSource.manager.findOne(Product, {
    where: { code },
  })
  if (!product)
    return res.status(404).json({ message: 'Producto no encontrado' })
  const updatedProduct = req.body
  await AppDataSource.manager.update(Product, code, updatedProduct)
  res.json(updatedProduct)
}

export async function getCategories(req: Request, res: Response) {
  const categories = await AppDataSource.manager.find(Category)
  res.json(categories)
}

export async function reviewProduct(req: Request, res: Response) {
  const { code } = req.query as { code: string }
  const { tittle, description } = req.body
  let { qualification } = req.body
  if (!qualification) {
    qualification = 0
  }
  if (!code)
    return res.status(400).json({ message: 'Falta el código del producto' })
  if (!tittle || !description)
    return res.status(400).json({ message: 'Faltan datos' })
  const product = await AppDataSource.manager.findOne(Product, {
    where: { code },
  })
  if (!product)
    return res.status(404).json({ message: 'Producto no encontrado' })
  const authToken = getToken(req)
  const user = await AppDataSource.manager.findOne(User, {
    where: { authToken },
  })
  const review = new Review()
  review.qualification = qualification
  review.tittle = tittle
  review.description = description
  review.user = user
  review.product = product
  await AppDataSource.manager.save(review)
  res.json(review)
}

export async function deleteReview(req: Request, res: Response) {
  const { code } = req.query as { code: string }
  if (!code)
    return res.status(400).json({ message: 'Falta el código de la review' })
  const review = await AppDataSource.manager.findOne(Review, {
    where: { code },
  })
  if (!review) return res.status(404).json({ message: 'Review no encontrada' })
  await AppDataSource.manager.delete(Review, code)
  res.json({ message: 'Review eliminada' })
}

import 'reflect-metadata'
import express from 'express'
import { userRoutes } from './routes/user.routes'
import { authRoutes } from './routes/auth.routes'
import cors from 'cors'
import { productRoutes } from './routes/product.routes'

const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)

app.get('/', (_, res) => {
  res.send('Hello World!')
})

export default app

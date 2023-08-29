import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entities/user.entity'
import { Product } from './entities/product.entity'
import { Category } from './entities/category.entity'
import { Review } from './entities/review.entity'
import { config } from 'dotenv'

config()

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Product, Category, Review],
  migrations: [],
  subscribers: [],
})

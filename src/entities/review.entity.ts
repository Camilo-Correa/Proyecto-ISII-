import { Column, Entity, Generated, ManyToOne, PrimaryColumn } from 'typeorm'
import { User } from './user.entity'
import { Product } from './product.entity'

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryColumn()
  @Generated('uuid')
  code!: string

  @Column()
  qualification!: number

  @Column()
  tittle!: string

  @Column({ type: 'text' })
  description!: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @ManyToOne(() => User, (user) => user.products)
  user: User

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product
}

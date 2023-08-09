import { Entity } from 'typeorm/decorator/entity/Entity'
import { User } from './user.entity'
import { Column, Generated, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { Category } from './category.entity'
import { Review } from './review.entity'

export enum ProductState {
  VISIBLE = 'VISIBLE',
  HIDDEN = 'HIDDEN',
  DELETED = 'DELETED',
}

@Entity({ name: 'products' })
export class Product {
  @PrimaryColumn()
  @Generated('uuid')
  code!: string

  @Column({ type: 'enum', enum: ProductState, default: ProductState.VISIBLE })
  state!: ProductState

  @Column()
  title!: string

  @Column({ type: 'text' })
  description!: string

  @Column()
  price!: string

  @Column()
  imageUrl!: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date

  @ManyToOne(() => User, (user) => user.products)
  user: User

  @ManyToOne(() => Category, (category) => category.products)
  category: Category

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[]

  isFavorite?: boolean
}

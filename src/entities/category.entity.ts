import { OneToMany } from 'typeorm'
import { Column } from 'typeorm/decorator/columns/Column'
import { PrimaryColumn } from 'typeorm/decorator/columns/PrimaryColumn'
import { Entity } from 'typeorm/decorator/entity/Entity'
import { Product } from './product.entity'

@Entity({ name: 'categories' })
export class Category {
  @PrimaryColumn()
  code!: string

  @Column()
  name!: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date

  @OneToMany(() => Product, (product) => product.category)
  products: Product[]
}

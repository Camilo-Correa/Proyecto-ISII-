import {
    Entity,
    Column,
    PrimaryColumn,
    Generated,
    OneToMany,
    ManyToMany,
    JoinTable,
  } from 'typeorm'
  import { Product } from './product.entity'
  import { Review } from './review.entity'
  
  export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
  }
  
  @Entity({ name: 'users' })
  export class User {
    @PrimaryColumn()
    @Generated('uuid')
    code!: string
  
    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role!: Role
  
    @Column()
    authToken!: string
  
    @Column()
    firstName!: string
  
    @Column()
    lastName!: string
  
    @Column({ unique: true })
    email!: string
  
    @Column()
    password!: string
  
    @Column()
    phone!: string
  
    @Column()
    location!: string
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date
  
    @OneToMany(() => Product, (product) => product.user)
    products: Product[]
  
    @ManyToMany(() => Product)
    @JoinTable()
    favorites: Product[]
  
    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[]
  }
  
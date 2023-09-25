'use client'

// pages/index.tsx
import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../context/authReducer'
import { GETproducts } from './products.api'
import { Product } from '../../model/product.model'
import styles from '../../styles/globals.module.css'
import { CircularProgress, Container, Grid, Typography } from '@mui/material'
import ProductWidget from '../../components/productWidget'

const Home = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  getProducts()

  async function getProducts() {
    const res = await GETproducts()
    if (res.status === 200) {
      const products = (await res.json()) as Product[]
      setProducts(products)
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className={styles.root}>
        <CircularProgress />
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className={styles.root}>
        <Container>
          <Typography variant="h3" align="center" my={2}>
            No hay productos
          </Typography>
        </Container>
      </div>
    )
  }

  return (
    <Container>
      <Typography variant="h3" align="center" my={2}>
        Productos
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={6} md={4}>
            <ProductWidget {...product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home

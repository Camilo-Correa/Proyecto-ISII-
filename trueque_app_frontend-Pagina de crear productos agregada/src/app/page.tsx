'use client'

// pages/index.tsx
import React from 'react'
import { useState } from 'react'
import { GETproducts } from './products.api'
import { Product } from '../../model/product.model'
import styles from '../../styles/globals.module.css'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import ProductCard from '../../components/productCard'
import CustomAppBar from '../../components/appBar'
import { useAuth } from '../../context/authReducer'

const Home = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { state } = useAuth()

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
      <Box flexGrow={1}>
        <CustomAppBar />
        <div className={styles.root}>
          <Container>
            <Typography variant="h3" align="center" my={2}>
              No hay productos
            </Typography>
            {state.token && (
              <Box textAlign={'center'}>
                <Button variant="contained" href="/product/new">
                  Crea uno!
                </Button>
              </Box>
            )}
          </Container>
        </div>
      </Box>
    )
  }

  return (
    <Box flexGrow={1}>
      <CustomAppBar />
      <Typography variant="h3" align="center" my={2}>
        Productos
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={6} md={4}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Home

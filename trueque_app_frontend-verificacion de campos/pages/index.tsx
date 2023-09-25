'use client'

// pages/index.tsx
import React, { useEffect } from 'react'
import { useState } from 'react'
import { GETproducts } from '../api/products.api'
import { Product } from '../model/product.model'
import styles from '../styles/globals.module.css'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import ProductCard from '../components/productCard'
import CustomAppBar from '../components/appBar'
import { useAuth } from '../context/authReducer'

const Home = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { state } = useAuth()

  useEffect(() => {
    getProducts()
  }, [])

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
                <Button variant="contained" href="/products/new">
                  ¡Crea uno!
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
      <Stack
        direction="row"
        my={2}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h3" align="center" my={2}>
          Productos
        </Typography>
        {state.token && (
          <Button variant="contained" href="/products/new">
            ¡Crea uno!
          </Button>
        )}
      </Stack>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={2}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Home

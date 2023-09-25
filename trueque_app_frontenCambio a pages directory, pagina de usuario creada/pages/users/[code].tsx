'use client'

import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import type { GetServerSideProps } from 'next'
import { FC, useEffect, useState } from 'react'
import styles from '../../styles/globals.module.css'
import CustomAppBar from '../../components/appBar'
import { User } from '../../model/user.model'
import { GETuser } from '../../api/users.api'
import { useAuth } from '../../context/authReducer'
import ProductCard from '../../components/productCard'

type PageProps = {
  code: string
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { code } = params as { code: string }

  return {
    props: {
      code,
    },
  }
}

const page: FC<PageProps> = ({ code }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User>(null)
  const { state } = useAuth()

  async function getUser() {
    const res = await GETuser(code)
    if (res.status === 200) {
      const user = (await res.json()) as User
      setUser(user)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getUser()
  }, [])

  if (isLoading) {
    return (
      <div className={styles.root}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <Box flexGrow={1}>
      <CustomAppBar />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        my={2}
      >
        <Avatar alt="Remy Sharp" sx={{ width: 80, height: 80 }} />
        <Typography variant="h2" align="center">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="subtitle1" align="center">
          {user.email}
        </Typography>
        <Typography variant="subtitle1" align="center">
          {user.phone}
        </Typography>
        {state.role === 'ADMIN' && (
          <Typography variant="subtitle1" align="center">
            {user.role}
          </Typography>
        )}
        <Typography variant="subtitle1" align="center">
          {user.location}
        </Typography>
      </Stack>
      <Box mx={4} my={2}>
        <Typography variant="h4">Productos:</Typography>
      </Box>
      <Box mx={4}>
        <Grid container spacing={2}>
          {user.products.map((product) => (
            <Grid item xs={2}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default page

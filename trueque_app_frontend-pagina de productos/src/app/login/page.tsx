'use client'

import { useState } from 'react'
import {
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material'
import styles from '../../../styles/globals.module.css'
import { useAuth } from '../../../context/authReducer'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { state, handleLogin } = useAuth()
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = await handleLogin(email, password)
    if (result) router.push('/')
  }

  if (state.isLoading)
    return (
      <div className={styles.root}>
        <CircularProgress />
      </div>
    )

  return (
    <div className={styles.root}>
      <Paper className={styles.paper}>
        {state.error && <Alert severity="error">{state.error}</Alert>}
        <Typography variant="h5" align="center" my={2}>
          Iniciar sesión
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            margin="normal"
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            margin="normal"
          />
          <Box my={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              className={styles.button}
              variant="contained"
              color="primary"
              type="submit"
              disabled={state.isLoading}
            >
              {state.token ? 'Iniciado' : 'Iniciar sesión'}
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  )
}

export default Login

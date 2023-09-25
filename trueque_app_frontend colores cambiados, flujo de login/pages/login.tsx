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
import styles from '../styles/globals.module.css'
import { useRouter } from 'next/router'
import { useAuth } from '../context/authReducer'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { state, handleLogin } = useAuth()
  const [error, setError] = useState<boolean>(false)
  const router = useRouter()

  // validate email string
  function validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email || !password) {
      setError(true)
      return
    } else if (!validateEmail(email)) {
      setError(true)
      setEmail(null)
      return
    }
    setError(false)
    const result = await handleLogin(email, password)
    if (result) router.push('/')
  }

  if (state.token) router.push('/')

  if (state.isLoading)
    return (
      <div className={styles.root}>
        <CircularProgress />
      </div>
    )

  return (
    <div className={styles.rootWithBackground}>
      <Paper className={styles.paper}>
        {state.error && <Alert severity="error">{state.error}</Alert>}
        {error && (
          <Alert severity="error">* Debe completar todos los campos</Alert>
        )}
        <Typography variant="h5" align="center" my={2}>
          Iniciar sesión
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            focused
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            margin="normal"
            error={!!error && !email}
            helperText={!!error && !email ? '* Ingrese un email valido' : ''}
          />
          <TextField
            id="password"
            label="Contraseña"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            margin="normal"
            error={!!error && !password}
            helperText={
              !!error && !password ? '* Ingrese una contraseña valida' : ''
            }
          />
          <Box my={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              className={styles.button}
              variant="contained"
              color="primary"
              type="submit"
              disabled={state.isLoading}
            >
              Iniciar sesión
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  )
}

export default Login

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
  Stack,
} from '@mui/material'
import styles from '../styles/globals.module.css'
import { useRouter } from 'next/router'
import { useAuth } from '../context/authReducer'
import validateEmail from '../utils/string.utils'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { state, handleLogin } = useAuth()
  const [error, setError] = useState<boolean>(false)
  const router = useRouter()

  async function handleSubmit() {
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
        <Stack spacing={3}>
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
          <Typography variant="subtitle1" align="center">
            ¿No tienes cuenta?
            <Button
              variant="text"
              color="primary"
              href="/register"
              sx={{ textTransform: 'none' }}
            >
              Registrate
            </Button>
          </Typography>
          <Button
            className={styles.button}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={state.isLoading}
          >
            Iniciar sesión
          </Button>
        </Stack>
      </Paper>
    </div>
  )
}

export default Login

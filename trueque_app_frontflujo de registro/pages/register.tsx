'use client'

import {
  Alert,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAuth } from '../context/authReducer'
import { useRouter } from 'next/router'
import styles from '../styles/globals.module.css'
import { useState } from 'react'
import { CreateUserModel } from '../model/user.model'
import validateEmail from '../utils/string.utils'

const Register = () => {
  const { state, handleRegister } = useAuth()
  const [error, setError] = useState<boolean>(false)
  const [createUser, setCreateUser] = useState<CreateUserModel>()
  const [secondaryPassword, setSecondaryPassword] = useState<string>('')
  const router = useRouter()
  if (state.token) router.push('/')

  async function handleSubmit() {
    if (
      !createUser?.firstName ||
      !createUser?.lastName ||
      !createUser?.phone ||
      !createUser?.location ||
      !createUser?.email ||
      !createUser?.password
    ) {
      setError(true)
      return
    } else if (!validateEmail(createUser?.email)) {
      setError(true)
      setCreateUser({ ...createUser, email: null })
      return
    } else if (createUser?.password !== secondaryPassword) {
      setError(true)
      return
    }
    setError(false)
    const result = await handleRegister(createUser)
    // if (result) router.push('/')
    // const result = await handleLogin(createUser?.email, createUser?.password)
    // if (result) router.push('/')
  }

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
          Registrarse
        </Typography>
        <Stack spacing={3} my={2} mx={2}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            value={createUser?.firstName}
            onChange={(event) =>
              setCreateUser({ ...createUser, firstName: event.target.value })
            }
            margin="normal"
            error={!!error && !createUser?.firstName}
            helperText={
              !!error && !createUser?.firstName ? '* Campo requerido' : ''
            }
          />
          <TextField
            label="Apellido"
            variant="outlined"
            fullWidth
            value={createUser?.lastName}
            onChange={(event) =>
              setCreateUser({ ...createUser, lastName: event.target.value })
            }
            margin="normal"
            error={!!error && !createUser?.lastName}
            helperText={
              !!error && !createUser?.lastName ? '* Campo requerido' : ''
            }
          />
          <TextField
            label="Telefono"
            variant="outlined"
            fullWidth
            value={createUser?.phone}
            onChange={(event) =>
              setCreateUser({ ...createUser, phone: event.target.value })
            }
            margin="normal"
            error={!!error && !createUser?.phone}
            helperText={
              !!error && !createUser?.phone ? '* Campo requerido' : ''
            }
            type="number"
          />
          <TextField
            label="Ubicacion"
            variant="outlined"
            fullWidth
            value={createUser?.location}
            onChange={(event) =>
              setCreateUser({ ...createUser, location: event.target.value })
            }
            margin="normal"
            error={!!error && !createUser?.location}
            helperText={
              !!error && !createUser?.location ? '* Campo requerido' : ''
            }
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={createUser?.email}
            onChange={(event) =>
              setCreateUser({ ...createUser, email: event.target.value })
            }
            margin="normal"
            error={!!error && !createUser?.email}
            helperText={
              !!error && !createUser?.email ? '* Ingrese un email valido' : ''
            }
          />
          <TextField
            id="password"
            label="Contraseña"
            variant="outlined"
            fullWidth
            type="password"
            value={createUser?.password}
            onChange={(event) =>
              setCreateUser({ ...createUser, password: event.target.value })
            }
            margin="normal"
            error={
              (!!error && !secondaryPassword) ||
              createUser?.password !== secondaryPassword
            }
            helperText={
              !!error && !secondaryPassword
                ? '* Ingrese una contraseña valida'
                : createUser?.password !== secondaryPassword
                ? '* Las contraseñas no coinciden'
                : ''
            }
          />
          <TextField
            id="password"
            label="Confirma tu contraseña"
            variant="outlined"
            fullWidth
            type="password"
            value={secondaryPassword}
            onChange={(event) => setSecondaryPassword(event.target.value)}
            margin="normal"
            error={
              (!!error && !secondaryPassword) ||
              createUser?.password !== secondaryPassword
            }
            helperText={
              !!error && !secondaryPassword
                ? '* Ingrese una contraseña valida'
                : createUser?.password !== secondaryPassword
                ? '* Las contraseñas no coinciden'
                : ''
            }
          />
          <Typography variant="subtitle1" align="center">
            ¿Ya tienes cuenta ?
            <Button
              variant="text"
              color="primary"
              href="/login"
              sx={{ textTransform: 'none' }}
            >
              Inicia sesion
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

export default Register

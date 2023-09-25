'use client'

import { useEffect, useState } from 'react'
import withAuth from '../../../components/withAuth'
import { DELETEuser, GETusers } from '../users.api'
import { useAuth } from '../../../context/authReducer'
import {
  Alert,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import styles from '../globalStyles.module.css'
import { User } from '../../../model/user.model'

const UsersHomePage = () => {
  const [users, setUsers] = useState<User[]>([])
  const { state } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')

  getUsers()

  async function getUsers() {
    const res = await GETusers(state.token)
    if (res.status === 200) {
      const users = (await res.json()) as User[]
      setUsers(users)
    }
    setIsLoading(false)
  }

  async function handleDeleteUser(code: string) {
    setIsLoading(true)
    const res = await DELETEuser(state.token, code)
    if (res.status === 200) {
      await getUsers()
      setShowAlert(true)
      setAlertMessage('Usuario eliminado correctamente')
      setTimeout(() => {
        setShowAlert(false)
      }, 3000)
    }
  }

  if (isLoading)
    return (
      <div className={styles.root}>
        <CircularProgress />
      </div>
    )

  if (users.length === 0) {
    return (
      <Container>
        <Typography variant="h3" align="center" my={2}>
          No hay usuarios
        </Typography>
      </Container>
    )
  }

  return (
    <Container>
      {showAlert && <Alert severity="success">{alertMessage}</Alert>}
      <Typography variant="h3" align="center" my={2}>
        Usuarios
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.code}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <button>Editar</button>
                  <button onClick={() => handleDeleteUser(user.code)}>
                    Eliminar
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default withAuth(UsersHomePage)

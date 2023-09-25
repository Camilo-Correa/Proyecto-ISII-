'use client'

import { useEffect, useState } from 'react'
import withAuth from '../../../components/withAuth'
import { DELETEuser, GETusers, PUTuser } from '../users.api'
import { useAuth } from '../../../context/authReducer'
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import styles from '../../../styles/globals.module.css'
import { Role, User } from '../../../model/user.model'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CustomAppBar from '../../../components/appBar'

const UsersHomePage = () => {
  const [users, setUsers] = useState<User[]>([])
  const { state } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [openDeleteUserDialog, setOpenDeleteUserDialog] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false)
  const [userToEdit, setUserToEdit] = useState<User | null>(null)

  useEffect(() => {
    getUsers()
  }, [])

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

  async function handleEditUser(code: string) {
    setIsLoading(true)
    const res = await PUTuser(state.token, code, userToEdit)
    if (res.status === 200) {
      await getUsers()
      setShowAlert(true)
      setAlertMessage('Usuario editado correctamente')
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
      <Box flexGrow={1}>
        <CustomAppBar />
        <div className={styles.root}>
          <Container>
            <Typography variant="h3" align="center" my={2}>
              No hay usuarios
            </Typography>
          </Container>
        </div>
      </Box>
    )
  }

  return (
    <Box>
      <CustomAppBar />
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
              <TableCell>Telefono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.code}>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <ButtonGroup variant="contained">
                    <Button
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setUserToEdit(user)
                        setOpenEditUserDialog(true)
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setUserToDelete(user)
                        setOpenDeleteUserDialog(true)
                      }}
                    >
                      Eliminar
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {userToDelete && (
        <Dialog
          open={openDeleteUserDialog}
          onClose={() => setOpenDeleteUserDialog(false)}
        >
          <DialogTitle id="alert-dialog-title">
            ¿Eliminar a {userToDelete.firstName}?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Esta acción no se puede deshacer
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteUserDialog(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                setOpenDeleteUserDialog(false)
                handleDeleteUser(userToDelete.code)
                setUserToDelete(null)
              }}
              autoFocus
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {userToEdit && (
        <Dialog
          open={openEditUserDialog}
          onClose={() => setOpenEditUserDialog(false)}
        >
          <DialogTitle id="alert-dialog-title">
            ¿Editar a {userToEdit.firstName}?
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={userToEdit.firstName}
              onChange={(event) =>
                setUserToEdit({ ...userToEdit, firstName: event.target.value })
              }
              margin="normal"
            />
            <TextField
              label="Apellido"
              variant="outlined"
              fullWidth
              value={userToEdit.lastName}
              onChange={(event) =>
                setUserToEdit({ ...userToEdit, lastName: event.target.value })
              }
              margin="normal"
            />
            <TextField
              label="Telefono"
              variant="outlined"
              fullWidth
              value={userToEdit.phone}
              onChange={(event) =>
                setUserToEdit({ ...userToEdit, phone: event.target.value })
              }
              margin="normal"
              inputProps={{ type: 'number' }}
            />
            <TextField
              label="Ubicación"
              variant="outlined"
              fullWidth
              value={userToEdit.location}
              onChange={(event) =>
                setUserToEdit({ ...userToEdit, location: event.target.value })
              }
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">Rol</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userToEdit.role}
                label="Age"
                onChange={(event) => {
                  const role = event.target.value as Role
                  setUserToEdit({ ...userToEdit, role })
                }}
              >
                <MenuItem value={'USER'}>USER</MenuItem>
                <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenEditUserDialog(false)
                handleEditUser(userToEdit.code)
                setUserToEdit(null)
              }}
              autoFocus
            >
              Editar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  )
}

export default withAuth(UsersHomePage)

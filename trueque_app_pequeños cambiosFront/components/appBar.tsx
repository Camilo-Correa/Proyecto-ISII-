'use client'

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { useState } from 'react'
import { useAuth } from '../context/authReducer'
import { useRouter } from 'next/navigation'

const CustomAppBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { state } = useAuth()
  const router = useRouter()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" href="/">
            Trueque App
          </Button>
        </Box>
        {state.token ? (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Mi perfil</MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose()
                  router.push('/logout')
                }}
              >
                Cerrar sesion
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button color="inherit" href="/login">
            Iniciar sesion
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default CustomAppBar

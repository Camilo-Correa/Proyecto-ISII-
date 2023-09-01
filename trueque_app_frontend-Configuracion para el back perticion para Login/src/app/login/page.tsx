'use client';

import { useState } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';
import styles from './styles.module.css';
import { PUTloginUser } from '../auth.api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // TODO: Manejo de errores cuando alguno esta vació
    console.log('username', username);
    const { token } = await PUTloginUser(username, password);
    console.log('login', token);
    // Aquí puedes implementar la lógica para autenticar al usuario
  };

  return (
    <div className={styles.root}>
      <Paper className={styles.paper}>
        <Typography variant="h5" align="center" my={2}>
          Iniciar sesión
        </Typography>
        <form>
          <TextField
            className={styles.textField}
            label="Nombre de usuario"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className={styles.textField}
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box my={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Iniciar sesión
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default Login;

'use client';

import { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import styles from './styles.module.css';
import { useAuth } from '../../../context/authReducer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { state, handleLogin } = useAuth();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleLogin(username, password);
  }

  if (state.isLoading)
    return (
      <div className={styles.root}>
        <CircularProgress />
      </div>
    );

  return (
    <div className={styles.root}>
      <Paper className={styles.paper}>
        {state.error && <Alert severity="error">{state.error}</Alert>}
        <Typography variant="h5" align="center" my={2}>
          Iniciar sesión
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            className={styles.textField}
            label="Nombre de usuario"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            className={styles.textField}
            label="Contraseña"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            className={styles.button}
            variant="contained"
            color="primary"
            type="submit"
            disabled={state.isLoading}
          >
            Iniciar sesión
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;

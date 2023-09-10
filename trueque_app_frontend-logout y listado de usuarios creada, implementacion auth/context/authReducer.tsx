import { PUTloginUser } from '@/app/auth.api';
import { createContext, useReducer } from 'react';

interface AuthState {
  token: string | null;
  error: string | null;
  isLoading: boolean;
}

interface AuthContextProps {
  state: AuthState;
  handleLogin: (username: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { token: string } }
  | { type: 'LOGIN_ERROR'; payload: { error: string } }
  | { type: 'LOGOUT' };

const AuthContext = createContext<AuthContextProps>({
  state: { token: null, error: null, isLoading: false },
  handleLogin: async () => {},
  handleLogout: () => {},
});

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        error: null,
        isLoading: false,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        token: null,
        error: action.payload.error,
        isLoading: false,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...state, token: null };
    default:
      return state;
  }
}

function useAuth() {
  const [state, dispatch] = useReducer(authReducer, {
    token: localStorage.getItem('token'),
    error: null,
    isLoading: false,
  });

  async function handleLogin(
    username: string,
    password: string
  ): Promise<boolean> {
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await PUTloginUser(username, password);
      if (res.status === 200) {
        const { token } = await res.json();
        dispatch({ type: 'LOGIN_SUCCESS', payload: { token } });
        return true;
      } else {
        const { message } = await res.json();
        dispatch({ type: 'LOGIN_ERROR', payload: { error: message } });
        return false;
      }
    } catch (error) {
      //TODO: handle error
      dispatch({ type: 'LOGIN_ERROR', payload: { error: 'error.message' } });
      return false;
    }
  }

  function handleLogout() {
    dispatch({ type: 'LOGOUT' });
  }

  return { state, handleLogin, handleLogout };
}

export { useAuth };

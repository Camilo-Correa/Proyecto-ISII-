import { PUTloginUser } from '@/app/auth.api';
import { useReducer } from 'react';

interface AuthState {
  token: string | null;
  error: string | null;
  isLoading: boolean;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { token: string } }
  | { type: 'LOGIN_ERROR'; payload: { error: string } }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  token: null,
  error: null,
  isLoading: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        error: null,
        isLoading: false,
      };
    case 'LOGIN_ERROR':
      return { ...state, error: action.payload.error, isLoading: false };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}

function useAuth() {
  const [state, dispatch] = useReducer(authReducer, initialState);

  async function handleLogin(username: string, password: string) {
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await PUTloginUser(username, password);
      if (res.status === 200) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: { token: res.token } });
      } else {
        dispatch({ type: 'LOGIN_ERROR', payload: { error: res.message } });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: { error: error.message } });
    }
  }

  function handleLogout() {
    dispatch({ type: 'LOGOUT' });
  }

  return { state, handleLogin, handleLogout };
}

export { useAuth };

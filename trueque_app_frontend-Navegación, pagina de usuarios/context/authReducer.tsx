import { PUTloginUser } from '@/app/auth.api'
import { useReducer } from 'react'

interface AuthState {
  token: string | null
  error: string | null
  isLoading: boolean
  role?: string
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { token: string; role: string } }
  | { type: 'LOGIN_ERROR'; payload: { error: string } }
  | { type: 'LOGOUT' }

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true }
    case 'LOGIN_SUCCESS': {
      if (typeof window !== 'undefined') {
        localStorage.setItem('role', action.payload.role)
        localStorage.setItem('token', action.payload.token)
      }
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        error: null,
        isLoading: false,
      }
    }
    case 'LOGIN_ERROR':
      return {
        ...state,
        token: null,
        error: action.payload.error,
        isLoading: false,
      }
    case 'LOGOUT': {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
      }
      return { ...state, token: null, role: null }
    }
    default:
      return state
  }
}

function useAuth() {
  const [state, dispatch] = useReducer(authReducer, {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    role: typeof window !== 'undefined' ? localStorage.getItem('role') : null,
    error: null,
    isLoading: false,
  })

  async function handleLogin(
    email: string,
    password: string,
  ): Promise<boolean> {
    dispatch({ type: 'LOGIN_START' })
    try {
      const res = await PUTloginUser(email, password)
      if (res.status === 200) {
        const { token, role } = await res.json()
        dispatch({ type: 'LOGIN_SUCCESS', payload: { token, role } })
        return true
      } else {
        const { message } = await res.json()
        dispatch({ type: 'LOGIN_ERROR', payload: { error: message } })
        return false
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: { error: error.message } })
      return false
    }
  }

  function handleLogout() {
    dispatch({ type: 'LOGOUT' })
  }

  return { state, handleLogin, handleLogout }
}

export { useAuth }

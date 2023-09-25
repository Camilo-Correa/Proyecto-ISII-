import { useRouter } from 'next/router'
import { useAuth } from '../context/authReducer'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import styles from '../styles/globals.module.css'

const withAuth = (Component: React.ComponentType<any>) => {
  const AuthenticatedComponent = (props: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { state } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!state.token) {
        router.push('/login')
      } else {
        setIsLoading(false)
      }
    }, [])

    if (isLoading) {
      return (
        <div className={styles.root}>
          <CircularProgress />
        </div>
      )
    }

    return <Component {...props} />
  }

  return AuthenticatedComponent
}

export default withAuth

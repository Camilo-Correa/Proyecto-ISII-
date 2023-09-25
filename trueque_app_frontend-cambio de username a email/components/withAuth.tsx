import { useRouter } from 'next/navigation'
import { useAuth } from '../context/authReducer'

const withAuth = (Component: React.ComponentType<any>) => {
  const AuthenticatedComponent = (props: any) => {
    const { state } = useAuth()
    const router = useRouter()

    if (!state.token) {
      router.push('/login')
      return null
    }

    return <Component {...props} />
  }

  return AuthenticatedComponent
}

export default withAuth

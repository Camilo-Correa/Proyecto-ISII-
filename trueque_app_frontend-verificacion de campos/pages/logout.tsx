'use client'

import { useEffect } from 'react'
import { useAuth } from '../context/authReducer'
import { useRouter } from 'next/router'

const LogoutPage = () => {
  const router = useRouter()
  const { handleLogout } = useAuth()
  useEffect(() => {
    handleLogout()
    router.push('/')
  }, [])

  return null
}

export default LogoutPage

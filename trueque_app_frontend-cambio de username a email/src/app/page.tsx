'use client'

// pages/index.tsx
import React from 'react'
import { useState } from 'react'
import UserList from '../../components/userList'
import usersData from './data/users.json'
import UserForm from '../../components/userForm'

const Home = () => {
  const [users, setUsers] = useState(usersData)

  const handleAddUser = (user) => {
    const newUser = { ...user, id: Date.now() }
    setUsers([...users, newUser])
  }

  return (
    <div>
      <h1>User List</h1>
      <UserList users={users} />
      <UserForm onSubmit={handleAddUser} />
    </div>
  )
}

export default Home

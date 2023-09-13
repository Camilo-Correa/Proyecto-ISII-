// pages/users/[id].tsx
import React from 'react'
import Link from 'next/link'
import usersData from '../../data/users.json'

const UserDetail = ({ params }) => {
  const user = getUserById(params.id)
  return (
    <div>
      <h1>User Detail</h1>
      <p>nombre: {user.name}</p>
      <Link href="/users">Back to User List</Link>
    </div>
  )
}

function getUserById(id) {
  const user = usersData.find((user) => user.id === parseInt(id))
  return user
}

export default UserDetail

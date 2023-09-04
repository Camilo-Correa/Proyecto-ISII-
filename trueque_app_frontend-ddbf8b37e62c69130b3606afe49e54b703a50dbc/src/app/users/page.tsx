// pages/users/index.tsx
import React from 'react';
import Link from 'next/link';
import UserList from '../../../components/userList';
import usersData from '../data/users.json';

const Users = () => {
  return (
    <div>
      <h1>User List</h1>
      <UserList users={usersData} />
      <Link href="/">Back to Home</Link>
    </div>
  );
};

export default Users;

import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllUsers, selectUserById } from './usersSlice'

export const UsersList = () => {
  const users = useSelector(selectAllUsers)

  const userListrendered = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ))

  return (
    <section>
      <h2>Users List</h2>
      <ul>{userListrendered}</ul>
    </section>
  )
}

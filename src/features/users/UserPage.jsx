import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersSlice'
import { selectAllPosts, selectPostsByUser } from '../posts/postsSlice'

export const UserPage = ({ match }) => {
  const { userId } = match.params
  const user = useSelector((state) => selectUserById(state, userId))
  const postsForUser = useSelector((state) => selectPostsByUser(state, userId))

  // const postsUser = useSelector((state) => {
  //   const allPosts = selectAllPosts(state)

  //   return allPosts.filter((post) => post.user === userId)
  // })

  const postsTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))
  return (
    <>
      <h2>{user.name}</h2>
      <ul>{postsTitles}</ul>
    </>
  )
}

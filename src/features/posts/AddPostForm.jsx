import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const users = useSelector((state) => {
    return state.users
  })

  const dispatch = useDispatch()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onUserChanged = (e) => setUserId(e.target.value)

  const handleSubmit = (e) => {
    if (title && content) {
      dispatch(postAdded(title, content, userId))
      setTitle('')
      setContent('')
      setUserId('')
    }
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
  const usersSelect = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <label htmlFor="select-user">User:</label>
        <select id="select-user" value={userId} onChange={onUserChanged}>
          <option value="">--Select an user</option>
          {usersSelect}
        </select>
        <button type="button" onClick={handleSubmit} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useEditPostMutation, useGetPostQuery } from '../api/apiSlice'

export const EditPostForm = ({ match }) => {
  const { postId } = match.params
  const { data: post } = useGetPostQuery(postId)
  const [update, { isLoading }] = useEditPostMutation()
  // const posts = useSelector((state) => selectPostById(state, postId))

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const history = useHistory()

  const onSavePostClicked = async () => {
    if (title && content) {
      await update({ id: postId, title, content })
      history.push(`/post/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
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
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}

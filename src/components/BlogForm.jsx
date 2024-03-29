import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            data-testid="title"
            name="title"
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            data-testid="author"
            name="author"
            type="text"
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            data-testid="url"
            name="url"
            type="text"
            value={url}
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <button type="submit"> add blog </button>
      </form>
    </div>
  )
}

export default BlogForm
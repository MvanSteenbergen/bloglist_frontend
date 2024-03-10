import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = (event) => {
    event.preventDefault()
    const updatedObject = {
      user: blog.user._id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateLikes(blog.id,  updatedObject)
  }

  const deleteHandler = (event) => {
    event.preventDefault
    if (window.confirm('Do you really want to delete this post?')) {
      deleteBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>{blog.url}</div>
        <div>likes {blog.likes}</div>
        <div>{blog.user.name}</div>
        <button onClick={like}>like</button>
        <button onClick={deleteHandler}>delete</button>
      </div>
    </div>
  )}

export default Blog
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [messagetype, setMessagetype] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort(function(a, b) {
        return b.likes - a.likes
      })
      setBlogs( blogs )
    }
    )
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Login succeeded')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessagetype('error')
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setMessagetype('success')
    setMessage('Logout succeeded')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  let addBlog = async (blogObject) => {
    try {
      await blogService.create( blogObject )
      let blogs = await blogService.getAll()
      blogs = blogs.sort(function(a, b) {
        return b.likes - a.likes
      })
      setBlogs(blogs)
      setMessagetype('success')
      setMessage(`Added ${blogObject.title} by ${blogObject.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessagetype('error')
      setMessage(`Failed to add blog post. ${exception}`)
      setTimeout(() => {
        setMessage(exception)
      }, 5000)
    }
  }

  let updateLikes = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject )
      let blogs = await blogService.getAll()
      blogs = blogs.sort(function(a, b) {
        return b.likes - a.likes
      })
      setBlogs(blogs)
    } catch (exception) {
      setMessagetype('error')
      setMessage(`Failed to update likes. ${exception}`)
      setTimeout(() => {
        setMessage(exception)
      }, 5000)
    }
  }

  let deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      let blogs = await blogService.getAll()
      blogs = blogs.sort(function(a, b) {
        return b.likes - a.likes
      })
      setBlogs(blogs)
    }catch (exception) {
      setMessagetype('error')
      setMessage(`Failed to delete blog. ${exception}`)
      setTimeout(() => {
        setMessage(exception)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <p> {user.name} has logged in. <button data-testid="logout" onClick={handleLogout}>Logout</button></p>
        <Togglable buttonLabel = "New blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} user={user}/>
        )}
        <p>
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} className={messagetype}/>
      {!user && loginForm()}
      {user && blogForm()}
    </div>
  )
}

export default App
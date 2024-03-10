import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls createBlog', async () => {
  let container

  const user = userEvent.setup()
  const createBlog = vi.fn()

  container = render(<BlogForm createBlog={createBlog} />).container

  const title = container.querySelector('input[name="title"]')
  const author = container.querySelector('input[name="author"]')
  const url = container.querySelector('input[name="url"]')

  const sendButton = screen.getByText('login')

  await user.type(title, 'Testing a title')
  await user.type(author, 'Testing the author')
  await user.type(url, 'http://testingtheurl.com/')

  await user.click(sendButton)

  console.log(createBlog.mock.calls[0][0][0])

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('Testing a title')
  expect(createBlog.mock.calls[0][0].author).toBe('Testing the author')
  expect(createBlog.mock.calls[0][0].url).toBe('http://testingtheurl.com/')
})
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('Collapse logic', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'Nice blog',
      author: 'A Wise Man',
      url: 'https://google.com',
      likes: 5,
      user: {
        name: 'Gerard',
      },
    }
    container = render(<Blog blog={blog}/>).container
  })

  test('renders on screen', async () => {
    await screen.findAllByText('Nice blog by A Wise Man')
  })

  test('At the start, extra information is not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('After clicking the button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

})

describe('Like button', () => {
  test('Clicking like twice calls event handler twice', async () => {
    const blog = {
      title: 'Nice blog',
      author: 'A Wise Man',
      url: 'https://google.com',
      likes: 5,
      user: {
        name: 'Gerard',
      },
    }

    const mockHandler = vi.fn()

    render(<Blog blog={blog} updateLikes={mockHandler} />)
    const user = userEvent.setup()
    const view = screen.getByText('view')
    const like = screen.getByText('like')
    await user.click(view)
    await user.click(like)
    await user.click(like)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
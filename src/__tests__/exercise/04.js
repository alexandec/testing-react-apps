// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const username = screen.getByLabelText('Username')
  const password = screen.getByLabelText('Password')
  const submitButton = screen.getByRole('button', {name: 'Submit'})

  userEvent.type(username, 'fonzie')
  userEvent.type(password, 'bear')
  userEvent.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'fonzie',
    password: 'bear',
  })
})

/*
eslint
  no-unused-vars: "off",
*/

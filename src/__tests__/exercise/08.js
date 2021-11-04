// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

const Counter = () => {
  const {count, increment, decrement} = useCounter()

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<Counter />)
  const [increment, decrement] = screen.getAllByRole('button')
  const message = screen.getByText(/count/i)

  expect(message).toHaveTextContent('Count: 0')
  userEvent.click(increment)
  expect(message).toHaveTextContent('Count: 1')
  userEvent.click(decrement)
  expect(message).toHaveTextContent('Count: 0')
})

/* eslint no-unused-vars:0 */

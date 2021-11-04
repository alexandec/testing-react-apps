// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'

beforeAll(() => {
  window.navigator.geolocation = {getCurrentPosition: jest.fn()}
})

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 38.85,
      longitude: 20.32,
    },
  }
  const {promise, resolve} = deferred()
  window.navigator.geolocation.getCurrentPosition = jest
    .fn()
    .mockImplementation(callback => {
      promise.then(() => callback(fakePosition))
    })

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(async () => {
    resolve()
    await promise
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    fakePosition.coords.latitude,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    fakePosition.coords.longitude,
  )
})

/*
eslint
  no-unused-vars: "off",
*/

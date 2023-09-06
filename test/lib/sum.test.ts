// sum.test.js
import { expect, test } from 'vitest'

export function sum(a, b) {
  return a + b
}

// Example test to set up vitest and github actions
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
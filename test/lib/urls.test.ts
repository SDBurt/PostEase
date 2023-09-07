// sum.test.js
import { containsURL, isValidUrl } from '@/lib/utils'
import { expect, test } from 'vitest'


test('isValidUrl on http://google.com returns true', () => {
  expect(isValidUrl("https://google.com")).toEqual(true)
})

test('isValidUrl on google.com returns false', () => {
  expect(isValidUrl("google.com")).toEqual(false)
})

test('containsURL on "google.com" returns "https://google.com"', () => {
  expect(containsURL("google.com")).toEqual("https://google.com")
})

test('containsURL with input "the site postease.ca is cool" returns "https://postease.ca"', () => {
  expect(containsURL("the site postease.ca is cool")).toEqual("https://postease.ca")
})
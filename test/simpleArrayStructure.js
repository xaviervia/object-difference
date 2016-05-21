const assert = require('assert')
const example = require('washington')
const objectDifference = require('../src/compare')

example('[] === []', () => (
  objectDifference([], []) === undefined
))

example('[1] === [1]', () => (
  objectDifference([1], [1]) === undefined
))

example('[1] !== [2] -> [[1], [2]]', () => (
  assert.deepEqual(
    objectDifference([1], [2]),
    [[1], [2]]
  )
))

example('[1, 2] !== [2] -> [[1], ]', () => (
  assert.deepEqual(
    objectDifference([1, 2], [2]),
    [[1], undefined]
  )
))

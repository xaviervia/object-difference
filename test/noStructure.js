const assert = require('assert')
const example = require('washington')
const objectDifference = require('../src/compare')

example('1 === 1', () => (
  objectDifference(1, 1) === undefined
))

example('2 !== 1 -> [2, 1]', () => (
  assert.deepEqual(
    objectDifference(2, 1),
    [2, 1]
  )
))

example('1 !== {a:1} -> [1, {a:1}]', () => (
  assert.deepEqual(
    objectDifference(1, {a:1}),
    [1, {a:1}]
  )
))

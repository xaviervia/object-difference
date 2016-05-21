const assert = require('assert')
const example = require('washington')
const objectDifference = require('./index')

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

example('{a:1} === {a:1}', () => (
  objectDifference({a:1}, {a:1}) === undefined
))

example('{a:1} === {a:1, b:2} -> [ , {b:2}]', () => {
  assert.deepEqual(
    objectDifference({a:1}, {a:1, b:2}),
    [ undefined , {b:2} ]
  )
})

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

const assert = require('assert')
const example = require('washington')
const objectDifference = require('../src/compare')

example('@obj {a:1} === {a:1}', () => (
  assert.equal(
    objectDifference({a:1}, {a:1}),
    undefined
  )
))

example('@obj {a:1} === {a:1, b:2} -> [ , {b:2}]', () => {
  assert.deepEqual(
    objectDifference({a:1}, {a:1, b:2}),
    [ undefined , {b:2} ]
  )
})

example('@obj {a:1} === {a:2} -> [{a:1}, {a:2}]', () => {
  assert.deepEqual(
    objectDifference({a:1}, {a:2}),
    [ {a:1} , {a:2} ]
  )
})

const assert = require('assert')
const example = require('washington')
const objectDifference = require('../src/compare')

example('@obj @nested {a:{b:1}} === {a:{b:1}}', () => (
  assert.equal(
    objectDifference({a:{b:1}}, {a:{b:1}}),
    undefined
  )
))

example('@obj @nested {a:{b:1,c:2}} !== {a:{b:1}} -> [{a:{c:2}}, ]', () => (
  assert.deepEqual(
    objectDifference({a:{b:1,c:2}}, {a:{b:1}}),
    [{a:{c:2}}, undefined]
  )
))

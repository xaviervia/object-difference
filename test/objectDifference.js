import assert from 'assert'
import example from 'washington'
import objectDifference from '../src/objectDifference'

const referenceDifference = (a, b) =>
  a === b
    ? undefined
    : [a, b]

example('objectDifference: has difference', () =>
  assert.deepEqual(
    objectDifference(
      {
        removed: 1,
        different: 1,
        same: 1
      },
      {
        added: 1,
        different: 2,
        same: 1
      },
      {
        comparisonFunction: referenceDifference
      }
    ),

    [
      {
        removed: 1,
        different: 1
      },

      {
        added: 1,
        different: 2
      }
    ]
  )
)

example('objectDifference: equals', () =>
  assert.equal(
    objectDifference(
      { a: 1 },
      { a: 1 },
      {
        comparisonFunction: referenceDifference
      }
    ),
    undefined
  )
)

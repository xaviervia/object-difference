import assert from 'assert'
import example from 'washington'
import arrayDifference from '../src/arrayDifference'
import objectDifference from '../src/objectDifference'

const referenceCheckAndObjectCheck = (a, b) => {
  if (a === b) {
    return undefined
  } else if (a instanceof Object && b instanceof Object) {
    return objectDifference(a, b, {
      comparisonFunction: referenceCheckAndObjectCheck
    })
  } else {
    return [a, b]
  }
}

example('arrayDifference: has differences', () =>
  assert.deepEqual(
    arrayDifference(
      [
        { key: 'removed-1',
          is: 1 },

        { key: 'different',
          is: 1 },

        { key: 'removed-2',
          is: 1 },

        { key: 'same',
          is: 1 }
      ],

      [
        { key: 'added-1',
          is: 1 },

        { key: 'different',
          is: 2 },

        { key: 'same',
          is: 1 },

        { key: 'added-2',
          is: 1 }
      ],

      {
        comparisonFunction: referenceCheckAndObjectCheck,
        keyProperty: 'key'
      }
    ),

    [
      [
        { key: 'removed-1',
          is: 1 },

        { key: 'different',
          is: 1 },

        { key: 'removed-2',
          is: 1 }
      ],

      [
        { key: 'added-1',
          is: 1 },

        { key: 'different',
          is: 2 },

        { key: 'added-2',
          is: 1 }
      ]
    ]
  )
)

example('arrayDifference: no difference', () =>
  assert.equal(
    arrayDifference(
      [ { key: 'same', is: 1 }, { key: 'same-2', is: 2 } ],
      [ { key: 'same', is: 1 }, { key: 'same-2', is: 2 } ],
      {
        keyProperty: 'key',
        comparisonFunction: referenceCheckAndObjectCheck
      }
    ),
    undefined
  )
)

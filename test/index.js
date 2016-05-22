const example = require('washington')
const assert = require('assert')
const objectDifference = require('../index')

example('@compare object comparison', () =>
  assert.deepEqual(
    objectDifference(
      {
        removed: 1,
        different: 2,
        equal: 3
      },
      {
        different: 3,
        equal: 3,
        added: 4
      }
    ),

    [
      {
        removed: 1,
        different: 2
      },

      {
        different: 3,
        added: 4
      }
    ]
  )
)

example('@getAllKeys', () =>
  assert.deepEqual(

  )
)

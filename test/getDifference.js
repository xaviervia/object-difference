import assert from 'assert'
import example from 'washington'
import getDifference from '../src/getDifference'

example('getDifference: equal scalar', () =>
  assert.equal(
    getDifference(2, 2),
    undefined
  )
)

example('getDifference: different scalar', () =>
  assert.deepEqual(
    getDifference(2, 1),
    [2, 1]
  )
)

example('getDifference: nested structure', () =>
  assert.deepEqual(
    getDifference(
      {
        removed: [
          { key: 'removed' }
        ],

        kept: {
          array: [
            { key: 'removed' },
            { key: 'different',
              value: [
                { key: 'removed' },
                { key: 'same' }
              ]
            }
          ]
        },

        different: 'hola',

        ignoreMe: {
          no: [
            { key: 'change' }
          ]
        }
      },
      {
        added: {
          value: 'something'
        },

        kept: {
          array: [
            { key: 'different',
              value: [
                { key: 'added' },
                { key: 'same' }
              ]
            },
            { key: 'added' }
          ]
        },

        different: 'hello',

        ignoreMe: {
          no: [
            { key: 'change' }
          ]
        }
      }
    ),

    [
      {
        removed: [
          { key: 'removed' }
        ],

        kept: {
          array: [
            { key: 'removed' },
            {
              key: 'different',
              value: [
                { key: 'removed' }
              ]
            }
          ]
        },

        different: 'hola'
      },

      {
        added: {
          value: 'something'
        },

        kept: {
          array: [
            { key: 'different',
              value: [
                { key: 'added' }
              ]
            },
            { key: 'added' }
          ]
        },

        different: 'hello'
      }
    ]
  )
)

example('getDifference: equal complex structure', () =>
  assert.equal(
    getDifference(
      {
        a: 'b',
        c: {
          d: [
            { key: 'a' }
          ]
        }
      },

      {
        a: 'b',
        c: {
          d: [
            { key: 'a' }
          ]
        }
      }
    ),
    undefined
  )
)

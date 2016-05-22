const example = require('washington')
const assert = require('assert')
const objectDifference = require('../src/objectDifference')

const notUndefined = item => item !== undefined

const arrayDifference = (a, b, options) => {
  // Not that easy, huh?
  // Adding them all up will mean you don't know
  // their respective positions afterwards. Maybe the
  // annotations should include position information

  const cacheForRight = {}
  const left = a.map(x => {
    const rightVersion = b.find(y => y.key === x.key)

    if (rightVersion !== undefined) {
      const comparison = options.comparisonFunction(
        x, rightVersion, options
      )

      if (comparison) {
        cacheForRight[x.key] = comparison[1]

        return Object.assign({}, comparison[0], { key: x.key })
      } else {
        cacheForRight[x.key] = null

        return undefined
      }
    } else {
      return x
    }
  }).filter(notUndefined)

  const right = b.map(x => {
    if (cacheForRight[x.key] === undefined) {
      return x
    } else  if (cacheForRight[x.key] === null) {
      return undefined
    } else {
      return Object.assign({}, cacheForRight[x.key], { key: x.key })
    }
  }).filter(notUndefined)

  const finalLeft = left.length > 0 ? left : undefined
  const finalRight = right.length > 0 ? right : undefined

  return finalLeft !== undefined || finalRight !== undefined
    ? [ finalLeft, finalRight ]
    : undefined
}

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

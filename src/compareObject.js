const doesntHaveProperty = require('./lib/doesntHaveProperty')
const isEmpty = require('./lib/isEmpty')

const compareProperty = (a, b) => key =>

const objectDifference = (a, b) => {
  const difference = Object.keys(a).filter()

  return difference.length > 0
    ? difference.reduce((object, key) => {
        object[key] = a[key]

        return object
      }, {})
    : undefined
}

function compareObject (a, b) {
  if (!(a instanceof Object) || !(b instanceof Object)) {
    return undefined
  }

  const removals = objectDifference(a, b)
  const additions = objectDifference(b, a)

  return removals === undefined && additions === undefined
    ? true
    : [ removals, additions ]
}

module.exports = compareObject

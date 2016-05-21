const hasNoKey = a => key => !a[key]
const objectDifference = (a, b) => {
  const difference = Object.keys(a).filter(hasNoKey(b))

  return difference.length > 0
    ? difference.reduce((object, key) => {
        object[key] = a[key]

        return object
      }, {})
    : undefined
}
const isEmpty = a => Object.keys(a).length === 0

module.exports = (a, b) => {
  if (!(a instanceof Object) || !(b instanceof Object)) {
    return undefined
  }

  const removals = objectDifference(a, b)
  const additions = objectDifference(b, a)

  return removals === undefined && additions === undefined
    ? true
    : [ removals, additions ]
}

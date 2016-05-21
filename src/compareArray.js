const hasNotItem = a => x => !a.find(y => x === y)
const arrayDifference = (a, b) => {
  const difference = a.filter(hasNotItem(b))

  return difference.length > 0
    ? difference
    : undefined
}

module.exports = (a, b) => {
  if (!(a instanceof Array) || !(b instanceof Array)) {
    return undefined
  }

  const removals = arrayDifference(a, b)
  const additions = arrayDifference(b, a)

  return removals === undefined && additions === undefined
    ? undefined
    : [ removals, additions ]
}

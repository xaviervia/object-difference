const composeComparisons = require('./composeAndGetFirstValue')

function compareReference (a, b) {
  return a !== b
    ? [a, b]
    : undefined
}

function compareObject (a, b) {
  if (!(a instanceof Object) || !(b instanceof Object)) {
    return undefined
  }

  const getComparison = (a, b) => key => ({
      key,
      removed: !b[key],
      result: compare(a[key], b[key])
    })

  const removeEquals = comparison =>
    (console.log('BEFORE FILTER', comparison), true) &&
    comparison.result !== true &&
    comparison.result !== undefined

  const comparisonsToObject = (index) => (object, comparison, removals) => {
    object[comparison.key] = comparison.result[index]

    return object
  }

  const removals = Object.keys(a)
    .map(getComparison(a, b))
    .filter(removeEquals)

  const additions = Object.keys(b)
    .map(getComparison(b, a))
    .filter(removeEquals)

  return removals.length > 0 || additions.length > 0
    ? [
        removals.length > 0
          ? removals.reduce(comparisonsToObject(0), {})
          : undefined,
        additions.length > 0
          ? additions.reduce(comparisonsToObject(1), {})
          : undefined
      ]
    : true
}

function trueIfEqual (a, b) {
  return a === b
    ? true
    : undefined
}

function compare (a, b) {
  const comparisonResult = composeComparisons(
    compareReference,
    compareObject,
    trueIfEqual
  )(a, b)

  return comparisonResult === true
    ? undefined
    : comparisonResult
}

module.exports = compare

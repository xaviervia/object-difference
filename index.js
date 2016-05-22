'use strict'

const REMOVED = 0
const KEPT = 1
const ADDED = 2

getStatus

const propertyCompare = (a, b) => prop => ({
  prop,
  status: (a, b) => {
    if (a[prop] != null && b[prop] == null) return REMOVED
    if (a[prop] != null && b[prop] != null) return KEPT
    if (a[prop] == null && b[prop] != null) return ADDED
  }(a, b),
  result: ()
})

const allKeys = (a, b) =>
  Object.keys(a)
    .concat(Object.keys(b).filter(key => !a.find(key)))

function objectDifference (a, b) {
  if (a === b) {
    return undefined
  }

  console.log(allKeys(a, b))
}

module.exports = objectDifference

import arrayDifference from '../src/arrayDifference'
import objectDifference from '../src/objectDifference'

export default function getDifference (a, b) {
  if (a === b) {
    return undefined
  } else if (a instanceof Array && b instanceof Array) {
    return arrayDifference(a, b, {
      comparisonFunction: getDifference
    })
  } else if (a instanceof Object && b instanceof Object) {
    return objectDifference(a, b, {
      comparisonFunction: getDifference
    })
  } else {
    return [a, b]
  }
}

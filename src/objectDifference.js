const keysUnion = (a, b) =>
  Object.keys(a)
    .concat(
      Object.keys(b)
        .filter(key => !a.hasOwnProperty(key)))

const REMOVED = 0
const KEPT = 1
const ADDED = 2

const annotateKey = (a, b) => key => ({
  key,
  status: (() => {
    if (a.hasOwnProperty(key) && !b.hasOwnProperty(key)) {
      return REMOVED
    }
    if (a.hasOwnProperty(key) && b.hasOwnProperty(key)) {
      return KEPT
    }
    if (!a.hasOwnProperty(key) && b.hasOwnProperty(key)) {
      return ADDED
    }
  })(),
  value: [
    a[key],
    b[key]
  ]
})

const LEFT = 0
const RIGHT = 1

const POSITION_FOR_SIDE = {
  [LEFT]: REMOVED,
  [RIGHT]: ADDED
}

const reduceSide = (side, options) => (object, annotatedKey) => {
  switch (annotatedKey.status) {
    case POSITION_FOR_SIDE[side]:
      object[annotatedKey.key] = annotatedKey.value[side]
      break

    case KEPT:
      const comparisonResult = options.comparisonFunction(
        annotatedKey.value[LEFT],
        annotatedKey.value[RIGHT],
        options
      )

      if (comparisonResult != null) {
        object[annotatedKey.key] = comparisonResult[side]
      }
      break
  }

  return object
}

export default (a, b, options) => {
  const result = [LEFT, RIGHT].map(side =>
    keysUnion(a, b)
      .map(annotateKey(a, b))
      .reduce(reduceSide(side, options), {}))
      .map(side =>
        Object.keys(side).length > 0
          ? side
          : undefined)

  return result[LEFT] === undefined && result[RIGHT] === undefined
    ? undefined
    : result
}

const notUndefined = item => item !== undefined

const arrayDifference = (a, b, options) => {
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

module.exports = arrayDifference

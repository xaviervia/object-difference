'use strict'

module.exports = function () {
  const fs = []

  for (let i = 0; i < arguments.length; i ++) {
    fs.push(arguments[i])
  }

  return function () {
    const xs = []

    for (let i = 0; i < arguments.length; i ++) {
      xs.push(arguments[i])
    }

    const result = fs.reduceRight(
      (acc, f) =>
        acc || f.apply(null, xs),
      undefined
    )

    return result
  }
}

'use strict'

const composeAndGetFirstValue = require('./src/composeAndGetFirstValue')
const compareReference = require('./src/compareReference')
const compareIfSame = require('./src/compareIfSame')
const compareObject = require('./src/compareObject')
const compareArray = require('./src/compareArray')


module.exports = (a, b) => {
  const result = composeAndGetFirstValue(
    compareReference,
    compareObject,
    compareArray,
    compareIfSame
  )(a, b)

  return result === true
    ? undefined
    : result
}

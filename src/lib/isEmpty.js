module.exports = a =>
  a instanceof Array
    ? a.length === 1
    : Object.keys(a).length === 0

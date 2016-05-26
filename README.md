# object-difference

An experimental tool for getting the difference between two object structures with as little metadata as possible.

- Array ordering diff is not supported right now. It needs a custom metadata object as a result to work, a third structure that contains ordering data for the whole structure.

## Internal API

> Note: For both Object and Array, the comparison is done in two steps:
>
> 1. The difference function checks what properties are present and missing in the respective targets
> 2. Whenever a property is present in both targets, the comparisonFunction is invoked, passing down the values of the property in both cases and the `options` object into it
> 3. Reordering of the exact same properties in an Array will not be detected.

### objectDifference

```js
objectDifference(
  previousObject,
  nextObject,
  {
    comparisonFunction = objectDifference
  }
)
```

To be tested with a comparisonFunction that runs a simple reference comparison.

### arrayDifference

```js
arrayDifference(
  previousArray,
  nextArray,
  {
    comparisonFunction = objectDifference,
    keyProperty = 'key'
  }
)
```

Absence of `key` property will throw an Error. To be tested with a comparisonFunction that runs a simple reference comparison.

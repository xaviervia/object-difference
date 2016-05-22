> Note: For both Object and Array, the comparison is done in two steps:
>
> 1. The difference function checks what properties are present and missing in the respective targets
> 2. Whenever a property is present in both targets, the comparisonFunction is invoked, passing down the values of the property in both cases and the `options` object into it

## objectDifference

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

## arrayDifference

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

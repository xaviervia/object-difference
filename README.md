# Conditions for diff to work:

- All elements in an Array are either values or objects with a unique `key` property. These type of structures are not supported:

  [
   [0]
  ]

  [
    {
      a: 1
    },

    {
      b: 2
    }
  ]

# Notes

- Objects in an Array need a unique `key` property to be identified in the diff.
- There needs to be a comparison result format to be passed around:


{
  removed: 1,
  different: 2,
  equal: 3
}

{
  different: 3
  equal: 3,
  added: 4
}


[
  {
    removed: 1,
    different: 2
  },

  {
    different: 3,
    added: 4
  }
]

Status = REMOVE | KEEP | ADD

item: {
  key: String | Integer
  status: REMOVE | KEEP | ADD
  value: {}
}


[1] -> {
 key: 1,
 status: Status,
 value: 1
}

[{key: 'a', is: 'something'}] -> {
  key: 'a',
  status: Status,
  value: {
    key: 'a',
    is: 'something'
  }
}

[[1]] -> {

}

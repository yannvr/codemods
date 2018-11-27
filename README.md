### Collection of useful transformations

#### code cleanup
- `remove-logs`: remove console call expressions except error ones
- `remove-dbugger`: remove debugger statement

#### code refactoring

- `destructure-components`: destructure components state and props if they have more than one occurence
- `destructure-functions`: destructure functions `props` and `state` params. Takes the following arguments:
  - `--decl=1`: for function declaration (outside classes)
  - `--state=1`: to destructure the property `state` rather than props
  - `--arrow=1`: target arrow function for destructuring. Works only if no extra parentheses are used on function paramaters.
See `transforms/__tests_/destructure-functions.test.js` for examples

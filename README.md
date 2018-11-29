### JS/React transformations 
Don't let those leftover debug statements in your PR make you look a bozo or let the linter break your balls again 
with some destructuring warnings. Here is a collection of codemods to stop you getting RSI doing boring things.

A more maintainable code is a better code. That is the motivation. Simply run [transform](https://github.com/yannvr/codemods#holistic-transformation) using your eslint config to have 
 your code good to go.
 
### Transformations

#### code cleanup
- `remove-logs`: remove console call expressions except error ones
- `remove-dbugger`: remove debugger statement
- `no-unused-vars`: remove unused variables in function parameters and block statements

#### code refactoring

- `destructure-components`: 
Finally an auto fix for `react/destructuring-assignment` rule! Not a silver bullet but should make linter happier
and code easier to read. It will destructure any props or state passed as the single function parameters expect if the props is used only once.
- `destructure-functions`: destructure functions `props` and `state` params. Takes the following arguments:
  - `--decl=1`: for function declaration (outside classes)
  - `--state=1`: to destructure the property `state` rather than props
  - `--arrow=1`: target arrow function for destructuring. Works only if no extra parentheses are used on function paramaters.
See `transforms/__tests_/destructure-functions.test.js` for examples

#### Holistic transformation
- Apply all transformations! `yarn transform pathToFile [pathToEslintConfig]`

Takes the file to apply all transformations to and the eslint config of your project.
Specifying your eslint config is highly recommended since transformed code will probably not match expected coding style. Note that
packages required will need to be installed globally.

#### TODO
- More tests for `destructure-components` so it can handle larger project migration
- Make `destructure-components` safer (but still useful)
- Remove unused arguments
- Make a tranformation that makes the code bug free
- Reclaim your life by making more useful transforms and be happy
- Don't be that guy:

![alt text](https://quotesaga-img.s3.amazonaws.com/quote/QS_f8e7407af906410e8edd8d320d0f795c.jpg)
 

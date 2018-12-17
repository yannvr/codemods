### JS/React transformations

Don't let those leftover debug statements in your PR make you look a bozo or let the linter break your balls again
with some destructuring warnings. Here is a collection of codemods to stop you getting RSI doing boring things.

A more maintainable code is a better code. That is the motivation. Simply run to have
your code good to go.

### Installation

The app comes with a binary that so you won't even need to install another dependency to your bloated app

- `npm install`
- `npm -g i jscodeshift`

You can now [apply transformation individually](https://github.com/yannvr/codemods#individuals-transformation)

Follow the next steps to apply holistic transformation ([unlock the magic `fix` command](https://github.com/yannvr/codemods#holistic-transformation))

- `npm link`
- go to your repo (where you want to apply transformations) and `npm link jscodemods`
- You can now transform by simply typing `fix [file]` for a single file or apply it to all staged files with `fix-staged`

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
  - `--state=1`: to destructure the property `state` rather than props
  - `--arrow=1`: target arrow function for destructuring. Works only if no extra parentheses are used on function paramaters.
    See `transforms/__tests_/destructure-functions.test.js` for examples

### Holistic transformation

- **`fix-staged`**: transforms all your staged files before commit
- `fix [file]`: transforms specific file

Turns out it is quite destructive (no pun) so you can
rather pass `--safe` which does code cleanup only.

After trials on projects, I found that using unsafe fix does the destructuring you're after but requires you
to review each files. Still saving you time and making you happier.

### Individuals transformation

`jscodeshift -t transforms/remove-logs [myFile]` for instance to remove logs from your file for instance. You will to install
jscodeshift globally `npm -g i jscodeshift`

#### TODO

- More tests for `destructure-components` so it can handle larger project migration
- Make `destructure-components` safer (but still useful)
- Check shadow props
- Remove unused arguments
- Make a transformation that makes the code bug free
- Reclaim your life by making more useful transforms and be happy
- Don't be that guy:

![alt text](https://quotesaga-img.s3.amazonaws.com/quote/QS_f8e7407af906410e8edd8d320d0f795c.jpg)



// https://astexplorer.net/
export default function transformer(file, api) {
  const j = api.jscodeshift
  //TODO: remove log only
  return j(file.source)
    .find(j.CallExpression, {
      callee: {
        type: "MemberExpression",
        object: {
          name: "console",
        },
      },
    })
    .remove()
    .toSource()
}

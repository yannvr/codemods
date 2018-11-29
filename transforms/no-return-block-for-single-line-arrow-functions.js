/**
 *  Remove useless arrow function block statements
 */
export default (fileInfo, api) => {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  return root
    .find(j.ArrowFunctionExpression, {
      body: {
        type: "BlockStatement",
      },
    })
    .filter(p => p.value.body.body.length === 1)
    .forEach(p => (p.value.body = p.value.body.body[0].argument))
    .toSource()
}

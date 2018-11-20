module.exports = function(file, api) {
  const j = api.jscodeshift
  let propToReplace;

  return j(file.source)
    .find(j.ArrowFunctionExpression)
    .filter(p => p.value.params && p.value.params[0].name === "props")
    .forEach(p => {
      propToReplace = p.value.params[0]
      propToReplace.name = []
      const root = j(p)
      root.find(j.MemberExpression).forEach(p => {
        propToReplace.name.push(p.value.property.name)
        j(p).replaceWith(j.identifier(p.value.property.name))
      })
      propToReplace.name = `{ ${propToReplace.name.join(", ")} }`
    })
    .toSource()
}

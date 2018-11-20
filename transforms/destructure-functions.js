module.exports = function(file, api) {
  const j = api.jscodeshift
  let propToReplace

  return (
    j(file.source)
      .find(j.FunctionExpression)
      // Destructure functions
      .filter(
        p =>
          p.value.params &&
          p.value.params[0] &&
          p.value.params[0].name === "props"
      )
      .forEach(p => {
        const root = j(p)
        propToReplace = p.value.params[0]
        propToReplace.name = []
        root.find(j.MemberExpression).forEach(p => {
          console.log("p", p.value)
          propToReplace.name.push(p.value.property.name)
          j(p).replaceWith(j.identifier(p.value.property.name))
        })
        propToReplace.name = `{ ${propToReplace.name.join(", ")} }`
      })
      .toSource()
  )
}

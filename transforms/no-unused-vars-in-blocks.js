/**
 *  Remove unused variables in blocks
 */
module.exports = (fileInfo, api) => {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  return root
    .find(j.BlockStatement)
    .forEach(block => {
      const variables = []
      j(block)
        .find(j.VariableDeclarator)
        .forEach(p => {
          variables.push(p.value.id.name)
        })
        .forEach(p => p.value.id.name)
      variables.forEach(name => {
        j(block)
          .find(j.Identifier)
          .filter(p => p.value.name === name)
          .forEach((p, i, arr) => {
            if (arr.length === 1) {
              j(block)
                .find(j.VariableDeclarator, { id: { name } })
                .remove()
            }
          })
      })
    })
    .toSource()
}

/**
 *  Remove unused function parameters
 *  TODO: Remove unused variables in function parameters
 */
module.exports = (fileInfo, api) => {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  return root
    .find(j.Function)
    .forEach(funcNode => {
      const params = funcNode.value.params.map(a => a.name)
      const nodePath = j(funcNode)
      const paramsUsed = new Set()
      params.forEach(name => {
        nodePath
          .find(j.Expression)
          .filter(p => p.value.name === name)
          .forEach((p, i, arr) => {
            if (arr.length > 1) {
              paramsUsed.add(name)
            }
          })
      })
      funcNode.value.params = []
      for (const v of paramsUsed.values()) {
        funcNode.value.params.push(v)
      }
    })
    .toSource()
}

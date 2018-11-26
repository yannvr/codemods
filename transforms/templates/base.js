/**
 *  Empty to transformer boilerplate
 */
module.exports = function (fileInfo, api) {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  return root
    .find(j.Expression, {

    })
    .forEach(p => console.log(p.value))
    .toSource()
}

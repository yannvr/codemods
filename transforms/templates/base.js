/**
 *  Empty to transformer boilerplate
 */
export default (fileInfo, api) => {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  return root.toSource()
}

const { a, b, c } = test

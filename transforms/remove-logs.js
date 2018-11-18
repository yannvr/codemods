// https://astexplorer.net/
export default function transformer(file, api) {
  const j = api.jscodeshift;

  let previousNode

  const isConsoleLog = path => previousNode && previousNode.name === 'console' && path.node.name === 'log'

  const removeConsoleLog = path => {
    if(isConsoleLog(path)) {
      j(path.parent.parent).remove()
    } else {
      previousNode = path.node
    }
  }

  const consoleLogStatements = j(file.source).find(j.Identifier)
  const debugStatements = j(file.source).find(j.DebuggerStatement)

  return j(file.source)
    .find(j.Identifier)
    .forEach(path => {
      removeConsoleLog(path)
    })
    .toSource();
}


/*
  Destructure functions having state or props objects as sole argument
  Options:
    --state=1 property name for destructuring (default: props)

  FunctionDeclaration:
  --------------------
 function test(props) {   =>   function test({ id }) {
   return props.id               return id;
 }                             }


  FunctionExpression:
  -------------------
class C extends React.Component {         class C extends React.Component {
  test(props) {                             test({ id }) {
    return props.id               +---->      return id;
  }                                         }
}                                         }
 */

module.exports = function(file, api, options) {
  const j = api.jscodeshift
  const root = j(file.source)
  let propToReplace

  const propName = options.state ? "state" : "props"

  // console.log("prop name", propName)

  const hasFunctionParams = (paramName, p) =>
    p.value.params && p.value.params[0] && p.value.params[0].name === paramName

  const isNotConstructor = p => p.parentPath.value.kind !== "constructor"

  const replaceParamWithProps = p => {
    propToReplace = p.value.params[0]
    propToReplace.name = []
    j(p)
      .find(j.MemberExpression)
      .forEach(p => {
        propToReplace.name.push(p.value.property.name)
        j(p).replaceWith(j.identifier(p.value.property.name))
      })

    // TODO: Handle case where extra parentheses are present
    if (options.arrow) {
      propToReplace.name = `({ ${propToReplace.name.join(", ")} })`
    } else {
      propToReplace.name = `{ ${propToReplace.name.join(", ")} }`
    }
  }

  return root
    .find(j.Function)
    .filter(p => hasFunctionParams(propName, p))
    .filter(p => isNotConstructor(p))
    .forEach(p => replaceParamWithProps(p))
    .toSource({ trailingComma: true })
}

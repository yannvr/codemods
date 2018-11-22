/*
  Destructure functions having state or props objects as sole argument
  Options:
    --arrow=1 arrow function destructuring
    --decl=1 transform FunctionDeclaration rather than FunctionExpression
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
  // FunctionExpression for class methods and FunctionDeclaration for other
  const functionType = options.arrow ? "ArrowFunction" : "Function"
  const expressionOrDeclaration = options.decl ? "Declaration" : "Expression"
  const _functionType = functionType + expressionOrDeclaration

  const propName = options.state ? "state" : "props"

  if (!j[_functionType]) {
    console.error("Invalid arguments")
    return
  }

  // console.log("function type", functionType)
  // console.log("prop name", propName)

  const hasFunctionParams = (paramName, p) =>
    p.value.params && p.value.params[0] && p.value.params[0].name === paramName

  const replaceParamWithProps = p => {
    propToReplace = p.value.params[0]
    propToReplace.name = []
    j(p)
      .find(j.MemberExpression)
      .forEach(p => {
        propToReplace.name.push(p.value.property.name)
        j(p).replaceWith(j.identifier(p.value.property.name))
      })
    propToReplace.name = `{ ${propToReplace.name.join(", ")} }`
  }

  return root
    .find(j[_functionType])
    .filter(p => hasFunctionParams(propName, p))
    .forEach(p => replaceParamWithProps(p))
    .toSource({ trailingComma: true })
}

/*
*   Remove logs other than errors
*/
module.exports = function transformer(file, api) {
    const j = api.jscodeshift
    return j(file.source)
        .find(j.CallExpression, {
            callee: {
                type: "MemberExpression",
                object: {
                    name: "console",
                },
            },
        })
        .filter(p => p.value.callee.property.name !== 'error')
        .remove()
        .toSource()
}

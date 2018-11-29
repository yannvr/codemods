const defineInlineTest = require("jscodeshift/dist/testUtils").defineInlineTest
const transform = require("../remove-logs")

describe("remove-logs", () => {
  defineInlineTest(
    transform,
    {},
    `
console.log('log')
console.info('info')
console.warn('warn')
console.error('error')
`,
    `console.error('error')`,
    "remove logs except errors"
  )
})

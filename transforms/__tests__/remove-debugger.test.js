const defineInlineTest = require("jscodeshift/dist/testUtils").defineInlineTest
const transform = require("../remove-debugger")

describe("remove-logs", () => {
  defineInlineTest(transform, {}, "debugger", "", "remove debugger statements")
})

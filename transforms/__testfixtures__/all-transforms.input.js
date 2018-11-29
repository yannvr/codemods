// This one can only be transformed by `./scripts/transforms` which applies all transformtions

debugger
console.log("log")
console.info("info")
console.warn("warn")
console.error("error")

function test1(props) {
  return props.a + props.b
}

function test2(state) {
  return state.a + state.b
}

const test3 = props => props.a + props.b
const test4 = state => state.a + state.b

class C extends React.Component {
  getA() {
    return this.props.a
  }

  test(props) {
    return props.id
  }

  getAll() {
    const { a, b } = this.props
    return a + b
  }

  getAllState() {
    const { a, b } = this.state
    return a + b
  }

  render() {
    const { a, b } = this.state
    return <div bar={this.props.bar} a={a} b={b} />
  }
}

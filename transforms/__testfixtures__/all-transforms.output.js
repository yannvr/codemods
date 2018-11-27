console.error('error')

function test1({ a, b }) {
    return a + b;
}

function test2({ a, b }) {
    return a + b;
}

const test3 = ({ a, b }) => a + b
const test4 = ({ a, b }) => a + b

class C extends React.Component {
    getA() {
        return this.props.a
    }

    test({ id }) {
        return id;
    }

    getAll() {
        const {
            a,
            b,
        } = this.props
        return a + b;
    }

    getAllState() {
        const {
            a,
            b,
        } = this.state
        return a + b;
    }

    render() {
        const {
            a,
            b,
        } = this.state
        return <div bar={this.props.bar} a={a} b={b}/>;
    }
}

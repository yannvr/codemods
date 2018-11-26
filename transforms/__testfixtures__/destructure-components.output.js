class C extends React.Component {
    getA() {
        return this.props.a
    }

    test(props) {
        return props.id
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

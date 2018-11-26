class C extends React.Component {
    getA() {
        return this.props.a
    }

    test(props) {
        return props.id
    }

    getAll() {
        return this.props.a + this.props.b
    }

    getAllState() {
        return this.state.a + this.state.b
    }

    render() {
        return <div bar={this.props.bar} a={this.state.a} b={this.state.b}/>
    }
}

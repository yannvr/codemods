const MyComponent = (props) => {
    return <div id={props.id} bar={props.bar} test={props.test} />;
};

const MyComponent = props => {
    return <div id={props.id} />;
};

class C extends React.Component {

    getA() {
        return this.props.a
    }

    getAll() {
        return this.props.a + this.props.b
    }

    getAllState() {
        return this.state.a + this.state.b
    }

    render() {
        return <div  bar={this.props.bar}
                     a={this.state.a} b={this.state.b} />
    }
}

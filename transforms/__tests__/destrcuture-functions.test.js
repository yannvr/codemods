const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;
const transform = require('../destructure-functions');

describe('destructure-functions', () => {
  defineInlineTest(transform, {}, `
class C {
    test1(props) {
        return props.id
    }
}
  `,
      `
class C {
    test1({ id }) {
        return id;
    }
}
      `,
      'Function type: Function Expression, prop name: props');
});

describe('destructure-functions', () => {
    defineInlineTest(transform, {state: 1}, `
class C {
    test1(state) {
        return state.id
    }
}
  `,
        `
class C {
    test1({ id }) {
        return id;
    }
}
      `,
        'Function type: Function Expression, state name: state');
});

describe('destructure-functions', () => {
    defineInlineTest(transform, {arrow: 1}, `
const test = props => props.id
const test = props => <div id={props.id} />
class C {
    test1 = props => props.id
}
  `,
        `
const test = ({ id }) => id
const test = ({ id }) => <div id={id} />
class C {
    test1 = ({ id }) => id
}
      `,
        'Function type: Function Arrow Expression, prop name: props');
});

describe('destructure-functions', () => {
    defineInlineTest(transform, {arrow: 1, state: 1}, `
const test = state => state.id
class C {
    test1 = state => state.id
}
  `,
        `
const test = ({ id }) => id
class C {
    test1 = ({ id }) => id
}
      `,
        'Function type: Function Arrow Expression, prop name: state');
});


describe('destructure-functions', () => {
    defineInlineTest(transform, {decl: 1}, `
    function test1(props) {
        return props.id
    }
  `,
        `
    function test1({ id }) {
        return id;
    }
      `,
        'Function type: Function Declaration, prop name: props');
});

describe('destructure-functions', () => {
    defineInlineTest(transform, {decl:1, state: 1}, `
    function test1(state) {
        return state.id
    }
  `,
        `
    function test1({ id }) {
        return id;
    }
      `,
        'Function type: Function Declaration, prop name: state');
});

describe('destructure-functions', () => {
    defineInlineTest(transform, {arrow: 1}, `
    const test1 = props => props.id + props.name
  `,
        `
    const test1 = ({ id, name }) => id + name
      `,
        'Function type: Function Arrow Expression, prop name: props');
});


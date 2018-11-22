/**
 *  Copyright (c) 2016-present, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * An example of writing a unit test for a jscodeshift script using the
 * `defineTest` helper bundled with jscodeshift. This will run the
 * reverse-identifiers.js transform with the input specified in the
 * reverse-identifiers-input file, and expect the output to be the same as that
 * in reverse-identifiers-output.
 */

'use strict';

jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;
const transform = require('../destructure-functions');

// defineTest(__dirname, 'destructure-functions');
// defineTest(__dirname, 'destructure-functions', options, testFilePrefix);
// defineTest(__dirname, 'destructure-functions', options, testFilePrefix);

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
const test = (props) => props.id
const test = (props) => <div id={props.id} />
class C {
    test1 = (props) => props.id
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
const test = (state) => state.id
class C {
    test1 = (state) => state.id
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
    const test1 = (props) => props.id
  `,
        `
    const test1 = ({ id }) => id
      `,
        'Function type: Function Arrow Expression, prop name: props');
});


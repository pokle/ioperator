'use strict';

// @flow

/*::
  type Action = string;
  type IO = { io: Action, then: Function }
  type Actions = { [Action]: (IO) => any }
*/

function isIO(value /*: mixed */) {
  return Boolean(value != null && typeof value === 'object' && typeof value.io === 'string' && (!value.then || typeof value.then === 'function'));
}

function run_(actions, io) {
  // Execute the IO action
  const action = actions[io.io];
  if (action == null) return Promise.reject(new Error('Unknown io action: ' + io.io));

  return Promise.resolve(action(io)).then(result => {
    // Call the callback with the result of the action
    const nextIO = io.then ? io.then(result) : result;

    // loop
    if (isIO(nextIO)) {
      return run_(actions, nextIO);
    } else {
      return nextIO; // final result
    }
  });
}

var run = function run(actions /*:Actions*/, io /*:IO*/) {
  if (!actions) {
    throw new Error('ioperator.run called without actions');
  }

  if (!isIO(io)) {
    throw new Error('ioperator.run called with a non io-action: ' + io);
  }

  return run_(actions, io);
};

// A pure isomorphic application
var React = require('react');
var routes = function routes(_routes) {
  return { io: 'routes', routes: _routes };
};

var Home = function Home() {
  return React.createElement(
    'div',
    null,
    'Hey, you should go ',
    React.createElement(
      'a',
      { href: '/hey' },
      'here'
    ),
    ' '
  );
};

var Hello = function Hello(_ref) {
  var name = _ref.name;
  return React.createElement(
    'h1',
    null,
    'Hello ',
    name
  );
};
var Hey = function Hey() {
  return React.createElement(Hello, { name: 'there' });
};

function app() /*:IO*/{
  return routes([{ path: '/', then: Home }, { path: '/hey', then: Hey }]);
}

// import React from 'react'
// import ReactDOM from 'react-dom'
var actions = {
  routes: function routes(_ref) {
    //   ReactDOM.render()

    
  }
};

run(actions, app());

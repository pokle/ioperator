'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// @flow

/*::
  type Action = string;
  type IO = { io: Action, then: Function }
  type Actions = { [Action]: (IO) => any }
*/

function isIO(value /*: mixed */) {
  return Boolean(value != null && typeof value === 'object' && typeof value.io === 'string' && (!value.then || typeof value.then === 'function'));
}

let run = (() => {
  var _ref = _asyncToGenerator(function* (actions /*:Actions*/, io /*:IO*/) {
    if (!isIO(io)) {
      throw new Error('Not an IO: ' + io);
    }

    while (isIO(io)) {
      // Execute the IO action
      const action = actions[io.io];
      if (action == null) throw new Error('Unknown io action: ' + io.io);
      const result = yield action(io);

      // Call the callback with the result
      io = io.then ? io.then(result) : result;
    }

    return io;
  });

  return function run(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

// A pure isomorphic application
var React = require('react');
var routes = function routes(_routes) {
  return { io: 'routes', routes: _routes };
};

var Home = function Home() {
  return React.createElement(
    'div',
    null,
    ' ',
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

// @flow

/*:: 
  type Action = string;
  type IO = { io: Action, then: Function } 
  type Actions = { [Action]: (IO) => any }
*/

function isIO(value /*: IO | mixed */) {
  return Boolean(
    value != null &&
      typeof value === 'object' &&
      typeof value.io === 'string' &&
      (!value.then || typeof value.then === 'function')
  );
}

function identity(x) {
  return x;
}

function run(actions /*:Actions*/, value /*:IO*/) {
  while (true) {
    if (value instanceof Promise) return value.then(v => run(actions, v));
    if (!isIO(value)) return value;

    const io /*:IO*/ = value;

    // Execute io.action
    const action = actions[io.io];
    if (action == null) throw new Error('Unknown io operation: ' + value.io);
    const next = action(io);

    // Call io.then with the result.
    const then = io.then || identity;
    if (next instanceof Promise) {
      return next.then(then).then(v => run(actions, v));
    } else {
      value = then(next);
    }
  }
}

module.exports.run = run;

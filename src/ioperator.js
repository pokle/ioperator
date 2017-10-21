// @flow

/*::
  type Action = string;
  type IO = { io: Action, then: Function }
  type Actions = { [Action]: (IO) => any }
*/

function isIO(value /*: mixed */) {
  return Boolean(
    value != null &&
      typeof value === 'object' &&
      typeof value.io === 'string' &&
      (!value.then || typeof value.then === 'function')
  );
}

async function run(actions /*:Actions*/, io /*:IO*/) {
  while (isIO(io)) {
    // Execute the IO action
    const action = actions[io.io];
    if (action == null) throw new Error('Unknown io action: ' + io.io);
    const result = await action(io);

    // Call the callback with the result
    io = io.then ? io.then(result) : result;
  }

  return io;
}

module.exports.run = run;

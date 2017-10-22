// @flow

/*::
  type Action = string;
  type IO = { io: Action, then: Function }
  type Actions = { [Action]: (IO) => any }
*/

export function isIO(value /*: mixed */) {
  return Boolean(
    value != null &&
      typeof value === 'object' &&
      typeof value.io === 'string' &&
      (!value.then || typeof value.then === 'function')
  );
}

function run_(actions, io) {
  // Execute the IO action
  const action = actions[io.io];
  if (action == null)
    return Promise.reject(new Error('Unknown io action: ' + io.io));

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

export function run(actions /*:Actions*/, io /*:IO*/) {
  if (!actions) {
    throw new Error('Missing actions');
  }

  if (!isIO(io)) {
    throw new Error('Not an IO: ' + io);
  }

  return run_(actions, io);
}

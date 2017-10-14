// @flow
//
// Refactoring simulate()
// - To see if I can break down the individual functions
// - I don't like the switch statement. It could even be a hashmap

/*:: 
  type Action = string;
  type IO = { io: Action, then: Function } 
  type Actions = { [Action]: (IO) => any }
*/

const readEventFromQueue = then => ({ io: 'read-event-from-queue', then });
const writeToDisk = (value, then) => ({ io: 'write-to-disk', value, then });
const log = (m, then) => ({ io: 'log', m, then });

function someProcess()/*:IO*/ {
  return readEventFromQueue(event => {
    if (event === 'END') {
      return 'The meaning of life is 41.99999999...';
    }

    return writeToDisk(event + ' received', _ =>
      log('Written event to disk: ' + event, someProcess)
    );
  });
}

function makeSimulator()/*:Actions*/ {
  const events = ['first event', 'second event', 'END'];
  return {
    'read-event-from-queue': () => events.shift(),
    'write-to-disk': io => console.log('writing to disk',io),
    log: io => console.log('logging', io)
  };
}

function isIO(value /*: IO | mixed */) {
  return Boolean(!!value && typeof value === 'object' && typeof value.io === 'string');
}

function run(actions/*:Actions*/, value /*:IO*/) {
  while (true) {
    if (!isIO(value)) return value;

    const io /*:IO*/ = value;
    const ioFunc = actions[io.io];
    if (ioFunc == null) throw new Error('Unknown io operation' + value.io);

    value = io.then(ioFunc(io));
  }
}

const result = run(makeSimulator(), someProcess());
console.log(result);

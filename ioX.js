// @flow
//
// Refactoring simulate()
// - To see if I can break down the individual functions
// - I don't like the switch statement. It could even be a hashmap

/*type IO = { io: string, then: Function } */

const readEventFromQueue = then => ({ io: 'read-event-from-queue', then });
const writeToDisk = (value, then) => ({ io: 'write-to-disk', value, then });
const log = (m, then) => ({ io: 'log', m, then });

function someProcess() {
  return readEventFromQueue(event => {
    if (event === 'END') {
      return 'The meaning of life is 41.99999999...';
    }

    return writeToDisk(event + ' received', _ =>
      log('Written event to disk: ' + event, someProcess)
    );
  });
}

function makeSimulator(events) {
  return {
    'read-event-from-queue': () => events[0],
    'write-to-disk': value => true,
    log: message => console.log(message)
  };
}

function isIO(value /*:mixed*/) {
  return !!value && typeof value === 'object' && typeof value.io === 'string';
}

function run(actions, value /*:mixed*/) {
  if (!isIO(value)) return value;

  const io/*:IO*/ = value;
  const ioFunc = actions[io.io];
  if (ioFunc == null) throw new Error('No such io' + value.io);

  return run(actions, io.then(ioFunc(io)));
}

const events = ['first event', 'second event', 'END'];
const result = run(makeSimulator(events), someProcess());
console.log('The answer is', result);

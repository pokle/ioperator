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

const Promise = require('bluebird');

const readEventFromQueue = then          => ({ io       : 'read-event-from-queue', then });
const writeToDisk        = (value, then) => ({ io       : 'write-to-disk', value, then });
const log                = (m, then=()   => 1) => ({ io : 'log', m, then });

function someProcess() /*:IO*/ {
  return readEventFromQueue(event => {
    if (event === 'END') {
      return 'The meaning of life is 41.99999999...';
    }

    return writeToDisk(event + ' received', _ =>
      log('Written event to disk: ' + event, someProcess)
    );
  });
}

function makeSimulator() /*:Actions*/ {
  const events = ['first event', 'second event', 'END'];
  return {
    'read-event-from-queue': io => events.shift(),
    'write-to-disk': io =>
      new Promise((resolve, reject) => setTimeout(x => resolve('👍'), 2000)),
    log: io => console.log('logging', io)
  };
}

function isIO(value /*: IO | mixed */) {
  return Boolean(
    !!value &&
      typeof value === 'object' &&
      typeof value.io === 'string' &&
      typeof value.then === 'function'
  );
}

function run(actions /*:Actions*/, value /*:IO*/) {
  while (true) {
    if (value instanceof Promise) return value.then(v => run(actions, v));
    if (!isIO(value)) return value;

    const io /*:IO*/ = value;
    const ioFunc = actions[io.io];
    if (ioFunc == null) throw new Error('Unknown io operation' + value.io);

    const next = ioFunc(io);
    if (next instanceof Promise)
      return next.then(io.then).then(v => run(actions, v));
    else value = io.then();
  }
}

// run(makeSimulator(), writeToDisk('x', r=>r)).then(console.log)
//run(makeSimulator(), log('⧴', _=>writeToDisk('x', r=>r))).then(console.log)
run(makeSimulator(), log('⧴', _ => writeToDisk('x', log))).then(r => console.log('r:', r))

//console.log(result);

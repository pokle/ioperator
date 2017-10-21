//
// Queue example
//
// Demonstrates how you can recurse endlessly without consuming stack


const ioperator = require('../src/ioperator');

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
      new Promise((resolve, reject) => setTimeout(x => resolve('👍'), 1000)),
    log: io => console.log('logging', io.m)
  };
}

ioperator.run(makeSimulator(), someProcess()).then(r => console.log('r:', r))

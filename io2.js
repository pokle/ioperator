// @flow
//
// This is the same as io1.js except someProcess() is much more readable

const readEventFromQueue = then => ({ io: 'read-event-from-queue', then });
const writeToDisk = (value, then) => ({ io: 'write-to-disk', value, then });
const log = (m, then) => ({ io: 'log', m, then });
const end = () => ({ io: 'END' });

function someProcess() {
  return readEventFromQueue(event => {
    if (event === 'END') {
      return end();
    }

    return writeToDisk(event + ' received', _ =>
      log('Written event to disk: ' + event, someProcess)
    );
  });
}

function simulate(io) {
  const events = ['first event', 'second event', 'END'];
  while (io && io.io) {
    switch (io.io) {
      case 'read-event-from-queue':
        io = io.then(events.shift());
        break;

      case 'write-to-disk':
        io = io.then(true);
        break;

      case 'log':
        console.log(io);
        io = io.then();
        break;

      case 'END':
        console.log('END of simulation');
        io = null;
        break;

      default:
        throw new Error('Unknown io: ' + JSON.stringify(io));
    }
  }
}

simulate(someProcess());

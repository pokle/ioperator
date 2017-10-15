// @flow
//
// This is the most basic example


function someProcess() {
  return {
    io: 'read-event-from-queue',
    then(event /*:string*/) {
      if (event === 'END') {
        return { io: 'END' };
      }

      return {
        io: 'write-to-disk',
        value: event + ' received',
        then(_) {
          return {
            io: 'log',
            value: 'Written event to disk: ' + event,
            then() {
              return someProcess();
            }
          };
        }
      };
    }
  };
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

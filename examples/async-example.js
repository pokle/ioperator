const ioperator = require('..');

const actions = {
  inc: ({ a }) => Promise.resolve(a + 1),
  dec: ({ a }) => Promise.resolve(a - 1),
  mulSync: ({ a, b }) => a * b,
  mulAsync: ({ a, b }) => Promise.resolve(a * b)
};

const inc = (a, then) => ({ io: 'inc', a, then });
const dec = (a, then) => ({ io: 'dec', a, then });
const mulSync = (a, b, then) => ({ io: 'mulSync', a, b, then });
const mulAsync = (a, b, then) => ({ io: 'mulAsync', a, b, then });

// const process = v0 => inc(v0)
// const process = v0 => inc(v0, v1 => inc(v1));
// const process = v0 => inc(v0, v1 => inc(v1, inc));
const process = v0 => inc(v0, v1 => inc(v1, v2 => inc(v2, inc)));

ioperator.run(actions, process(0))
  .then(result => console.log('final result', result))
  .catch(err => console.error('Nope', err))

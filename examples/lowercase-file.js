const iox = require('../src/iox');
const assert = require('assert');
const fs = require('fs');

// Pure descriptions of the various actions we're going to invoke.
const readFile = (path, then) => ({ io: 'read-file', path, then });
const writeFile = (path, data, then) => ({ io: 'write-file', path, data, then });

// Pure function describing the impure actions required to read a file,
// lower case its contents, and write it back out to another file
const lowerCaseFile = (inp, out) =>
  readFile(inp, contents =>
    writeFile(out, contents.toString().toLowerCase(), _ => 'Go check ' + out)
  );

//
//
// Test with simulated actions
//
const simulatedActions = {
  'read-file': io => '# Simulated file\n127.0.0.1 localhost bingo\n',
  'write-file': io => 'Wrote to ' + io.path + ': ' + io.data // Act as if file was written
};

iox
  .run(simulatedActions, lowerCaseFile('/etc/hosts', 'blah'))
  .then(result => assert.equal(result, 'Go check blah'));

//
//
// Run with real actions
//
const realActions = {
  'read-file': io => fs.readFileSync(io.path),
  'write-file': io => fs.writeFileSync(io.path, io.data)
};
iox
  .run(realActions, lowerCaseFile('/etc/hosts', '/tmp/hosts-lowercased'))
  .then(console.log)
  .catch(console.error);

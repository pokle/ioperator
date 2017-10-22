const ioperator = require('../src/ioperator');

test('is an error to call run() with a non io value', () => {
  expect.assertions(1);
  return expect(ioperator.run({}, 'non-io-value')).rejects.toMatchObject(
    new Error('Not an IO: non-io-value')
  );
});

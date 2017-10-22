import { run } from '../src';

test('is an error to call run() with a non io value', () => {
  expect.assertions(1);
  return expect(run({}, 'non-io-value')).rejects.toMatchObject(
    new Error('Not an IO: non-io-value')
  );
});

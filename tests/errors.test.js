import { run } from '..';

test('is an error to call run() with a non io value', () => {
  expect.assertions(1);
  return expect(() => run({}, 'non-io-value')).toThrow(
    new Error('ioperator.run called with a non io-action: non-io-value')
  );
});

test('is an error to call run() without actions', () => {
  expect.assertions(1);
  return expect(() => run(undefined, 'non-io-value')).toThrow(
    new Error('ioperator.run called without actions')
  );
});

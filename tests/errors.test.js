const { run } = require('..');

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

test("When actions throw exceptions, run's promise is rejected with that error", () => {
  expect.assertions(1);
  const a = {
    boom() {
      throw new Error('*boom*');
    }
  };
  expect(run(a, { io: 'boom' })).rejects.toMatchObject(new Error('*boom*'));
});

test("When then callbacks throw exceptions, run's promise is rejected with that error", () => {
  expect.assertions(1);
  const a = { ping: () => 'pong' };
  const i = {
    io: 'ping',
    then() {
      throw new Error('*thwack*');
    }
  };
  expect(run(a, i)).rejects.toMatchObject(new Error('*thwack*'));
});

const jsc = require('jsverify');
const iox = require('..');

const actions = {
  'as-promised': ({ value }) => Promise.resolve(value),
  'will-fail': io => Promise.reject(new Error('failed'))
};

describe('Async IO', () => {
  it('Should fail when IO action is not known', () => {
    expect.assertions(1);
    return expect(
      iox.run({}, { io: 'some-unknown-action', then: () => 1 })
    ).rejects.toMatchObject(
      new Error('Unknown io action: some-unknown-action')
    );
  });

  it('should wait for async values before returning a promise', () => {
    expect.assertions(1);
    return iox
      .run(actions, { io: 'as-promised', value: 99.99 })
      .then(result => expect(result).toBe(99.99));
  });

  it('async errors should be propogated', () => {
    expect.assertions(1);
    return iox
      .run(actions, { io: 'will-fail', value: 99.99 })
      .catch(e => expect(e.message).toBe('failed'));
  });

  test('asynchronous inc and dec should cancel each other', () => {
    const actions = {
      inc: ({ value }) => Promise.resolve(value + 1),
      dec: ({ value }) => Promise.resolve(value - 1)
    };

    const process = v => {
      return { io: 'inc', value: v, then: value => ({ io: 'dec', value }) };
    };

    expect.assertions(1);
    return iox
      .run(actions, process(72))
      .then(result => expect(result).toBe(72));
  });

  test('mixing sync and async io should result in an async result', () => {
    const actions = {
      incA: ({ value }) => Promise.resolve(value + 1),
      decA: ({ value }) => Promise.resolve(value - 1),
      incS: ({ value }) => value + 1,
      decS: ({ value }) => value - 1
    };

    const process = v => {
      return { io: 'incS', value: v, then: value => ({ io: 'decA', value }) };
    };

    expect.assertions(1);
    return iox
      .run(actions, process(72))
      .then(result => expect(result).toBe(72));
  });
});

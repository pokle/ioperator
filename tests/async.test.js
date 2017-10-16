const jsc = require('jsverify');
const iox = require('../src/iox');

const actions = {
  'as-promised': ({ value }) => Promise.resolve(value),
  'will-fail': io => Promise.reject(new Error('failed'))
};

describe('Async IO', () => {
  it('Should fail when chained IO action is not known', () => {
    expect.assertions(1);
    return expect(
      iox.run(actions, {
        io: 'as-promised',
        value: { io: 'unknown-action' },
        then: x => x
      })
    ).rejects.toMatchObject(new Error('Unknown io action: unknown-action'));
  });

  it("Should resolve to the action's result when no 'then' callback is provided", () => {
    const actions = { scrub: io => 'lub-a-dub-dub' };
    return expect(iox.run(actions, { io: 'scrub' })).resolves.toBe(
      'lub-a-dub-dub'
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

  test('long chains of sync & async actions', () => {
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

    const process = v0 =>
      inc(v0, v1 =>
        inc(v1, v2 =>
          inc(v2, v3 =>
            inc(v3, v4 => mulSync(5, v4, v5 => mulAsync(5, v5, v6 => dec(v6))))
          )
        )
      );

    expect.assertions(1);
    return iox.run(actions, process(0)).then(result => expect(result).toBe(99));
  });
});

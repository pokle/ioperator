const jsc = require('jsverify');
const iox = require('..');

describe('Synchronous IO', () => {
  it('Should fail when IO action is not known', () => {
    expect(() =>
      iox.run({}, { io: 'some-unknown-action', then: () => 1 })
    ).toThrowError(/Unknown io operation: some-unknown-action/);
  });

  it('Should not fail when no then is provided for io action', () => {
    const actions = { scrub: io => 'lub-a-dub-dub' };
    expect(iox.run(actions, { io: 'scrub' })).toEqual('lub-a-dub-dub');
  });

  it('should return sync values as is', () => {
    jsc.assert(
      jsc.forall(
        'falsy | bool | number | string | array | json',
        v => iox.run({}, v) === v
      )
    );
  });

  test('synchronous inc and dec should cancel each other when chained', () => {
    const actions = {
      inc: ({ value }) => value + 1,
      dec: ({ value }) => value - 1
    };

    const inc = (value, then) => ({ io: 'inc', value, then });
    const dec = (value, then) => ({ io: 'dec', value, then });

    const someProcess = value => {
      return inc(value, dec);
    };

    expect(iox.run(actions, someProcess(123))).toEqual(123);
  });

  test('sync io errors', () => {
    const actions = {
      'nop': io => true,
      'will-fail': io => {
        throw new Error("I just can't help failing");
      }
    };

    const someProcess = () => ({ io: 'nop', then: io => ({ io: 'will-fail' })});

    expect(() => iox.run(actions, someProcess())).toThrowError("I just can't help failing")
  });
});

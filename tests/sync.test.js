const jsc = require('jsverify');
const iox = require('..');

describe('Synchronous IO', () => {
  it('should return sync values as is', () => {
    jsc.assert(
      jsc.forall('falsy | bool | number | string | array | json', v =>
        iox.run({}, v).then(result => result === v)
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

    expect.assertions(1);
    return expect(iox.run(actions, someProcess(123))).resolves.toEqual(123);
  });

  test('sync io errors', () => {
    const actions = {
      nop: io => true,
      'will-fail': io => {
        throw new Error("I just can't help failing");
      }
    };

    const someProcess = () => ({
      io: 'nop',
      then: io => ({ io: 'will-fail' })
    });

    expect.assertions(1);
    return expect(iox.run(actions, someProcess())).rejects.toMatchObject(
      new Error("I just can't help failing")
    );
  });
});

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

  it('should return synchronous IO results', () => {
    jsc.assert(
      jsc.forall(
        'falsy | bool | number | string | array | json',
        v => iox.run({}, v) === v
      )
    );
  });
});

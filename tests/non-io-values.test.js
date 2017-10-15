const jsc = require('jsverify');
const iox = require('..');

describe('non-io values', () => {
  it('should return primitives verbatim', () => {
    expect(iox.run({}, false)).toEqual(false);

    jsc.assert(jsc.forall('bool', v => iox.run({}, v) === v));
  });

  it('should run jsverify', () => {
    // forall (f: json -> bool, b: bool), f (f (f b)) ≡ f(b).
    var boolFnAppliedThrice = jsc.forall(
      'bool -> bool',
      'bool',
      (f, b) => f(f(f(b))) === f(b)
    );

    jsc.assert(boolFnAppliedThrice);
    // OK, passed 100 tests
  });
});

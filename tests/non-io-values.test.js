const jsc = require('jsverify');
const iox = require('..');

describe('non-io values', () => {
  it('should return non-IO types verbatim', () => {
    jsc.assert(
      jsc.forall('falsy | bool | number | string | array | json', v =>
        iox.run({}, v).then(result => result === v)
      )
    );
  });
});

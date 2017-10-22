var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var { run } = require('../src');

const actions = {
  single(io) {
    return 1;
  }
};

const single = (then) => ({ io: 'single', then});

// add tests
suite
  .add('ioperator#run single io action', {
    defer: true,
    fn(d) {
      return run(actions, single()).then(() => d.resolve());
    }
  })
  .add('ioperator#run double io actions', {
    defer: true,
    fn(d) {
      return run(actions, single(()=>single())).then(() => d.resolve());
    }
  })
  .add('ioperator#run triple io actions', {
    defer: true,
    fn(d) {
      return run(actions, single(()=>single(()=>single()))).then(() => d.resolve());
    }
  })
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });

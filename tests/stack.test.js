const { run } = require('..');

it("Ensure that we don't use the stack to iterate", () => {
  const actions = {
    nop: io => true
  };

  const someProcess = (countDown = 1000000) => {
    if (countDown <= 0) {
      return 'done!';
    } else {
      return { io: 'nop', then: () => someProcess(countDown - 1) };
    }
  };

  expect.assertions(1);
  return expect(run(actions, someProcess())).resolves.toBe('done!');
});

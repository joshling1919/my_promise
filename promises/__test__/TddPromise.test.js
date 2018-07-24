/* eslint-env node, jest */
const TddPromise = require('../TddPromise');

test('receives a executor function when constructed which is called immediately', () => {
  // mock function with spies
  const executor = jest.fn();
  const promise = new TddPromise(executor);
  // mock function should be called immediately
  expect(executor.mock.calls.length).toBe(1);
  // arguments should be functions
  expect(typeof executor.mock.calls[0][0]).toBe('function');
  expect(typeof executor.mock.calls[0][1]).toBe('function');
});

it('is in a PENDING state', () => {
  const promise = new TddPromise((fulfill, reject) => {
    /* ... */
  });
  // for the sake of simplicity the state is public
  expect(promise.state).toBe('PENDING');
});

it('transitions to the FULFILLED state with a `value`', () => {
  const value = ':)';
  const promise = new TddPromise((fulfill, reject) => {
    fulfill(value);
  });
  expect(promise.state).toBe('FULFILLED');
});

it('transitions to the REJECTED state with a `reason`', () => {
  const reason = 'I failed :(';
  const promise = new TddPromise((fulfill, reject) => {
    reject(reason);
  });
  expect(promise.state).toBe('REJECTED');
});

// A promise is a state machine with 3 states: pending, fulfilled, rejected.
class MyPromise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new Error('Executor function must be a function');
    }

    // Internal state. '$state' is the state of the promise.
    // '$chained' is an array of functions we need to call once this promise is settled.

    this.$state = 'PENDING';
    this.$chained = [];

    // the executor function takes 2 parameters, resolve() and reject()
    const resolve = (res) => {
      if (this.$state !== 'PENDING') {
        return;
      }
      this.$state = 'FULFILLED';
      this.$internalValue = res;
    };
  }

  then(onFulfilled, onRejected) {}
}

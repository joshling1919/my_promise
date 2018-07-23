/* // A promise is a state machine with 3 states: pending, fulfilled, rejected. */
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

      // If `res` is a "thenable", lock in this promise to match the
      // resolved or rejected state of the thenable.
      const then = res != null ? res.then : null;
      if (typeof then === 'function') {
        return then(resolve, reject);
      }

      this.$state = 'FULFILLED';
      this.$internalValue = res;

      // If somebody called `.then()` while this function was pending, need to
      // call their `onFulfilled` function
      for (const { onFulfilled } of this.$chained) {
        onFulfilled(res);
      }

      return res;
    };

    const reject = (err) => {
      if (this.$state !== 'PENDING') {
      }
      this.$state = 'REJECTED';
      this.$internalValue = err;
      for (const { onRejected } of this.$chained) {
        onRejected(err);
      }
    };

    // Call the executor function with `resolve()` and `reject()` as in the spec.
    try {
      // If executor function throws a sync exception, we consider that a
      // rejection. Keep in mind that, since `resolve()` or `reject()` can
      // only be called once, a function that synchronously calls `resolve()`
      // and then throws will lead to a fulfilled promise and a swallowed error.
      console.log('TRYING TO EXECUTE');
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  // then() function takes two parameters, onFulfilled() and onRejected(). The
  // then() function is responsible for making sure onFulfilled() gets called
  // if the promsie is fulfilled, and onRejected if the promise is rejected. If
  // the promise is already resolved or rejected, then() should call onFulfilled()
  // or onRejected() immediately. If the promise is still pending, then() should
  // push the functions onto the $chained array so the resolve() and reject()
  // functions can call them.
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const _onFulfilled = (res) => {
        try {
          resolve(onFulfilled(res));
        } catch (err) {
          reject(err);
        }
      };
      const _onRejected = (err) => {
        try {
          reject(onRejected(err));
        } catch (_err) {
          reject(_err);
        }
      };
      if (this.$state === 'FULFILLED') {
        _onFulfilled(this.$internalValue);
      } else if (this.$state === 'REJECTED') {
        _onRejected(this.$internalalue);
      } else {
        this.$chained.push({ onFulfilled: _onFulfilled, onRejected: _onRejected });
      }
    });
  }
}

// The idea of chaining is that if the `onFulfilled()` or `onRejected()` function
// returns a promise, `then()` should return a new promise that is "locked in"
// to match the state of the returned promise.

// the rest of the tutorial gets pretty complex and reading it over once today
// was pretty overwheling. I think what I need to do is that each step of the
// way I should just test it and walk through the code until I understand it, and
// then I can move on to coding up the next portion.

// const firstPromise = new MyPromise((resolve, reject) => {
//   console.log('RUNNING THE EXECUTOR FUNCTION');
//   // imagine if this were an api call, that took a second
//   // to respond with 'wubadubdub'
//   setTimeout(() => resolve('wubadubdub'), 1000);
// });

// firstPromise.then(successMessage => console.log(`wahoo ${successMessage}`));

// new MyPromise((resolve, reject) => {
//   setTimeout(() => resolve(1), 1000); // (*)
// })
//   .then((result) => {
//     console.log('HERE IS THE FIRST RESULT', result); // 1
//     return result * 2;
//   })
//   .then((result) => {
//     console.log('HERE IS THE SECOND RESULT', result); // 2
//     return result * 2;
//   })
//   .then((result) => {
//     console.log('HERE IS THE THIRD RESULT', result); // 4
//     return result * 2;
//   });

const p = new MyPromise((resolve) => {
  setTimeout(() => resolve('World'), 100);
});

p.then(res => new MyPromise(resolve => resolve(`Hello, ${res}`)))
  // Will print out 'Hello, World' after approximately 100ms
  .then(res => console.log(res));

/* // Old #then method that does not support promise chaining:
// then(onFulfilled, onRejected) {
//   if (this.$state === 'FULFILLED') {
//     console.log('ON FULFILLED');
//     onFulfilled(this.$internalValue);
//   } else if (this.$state === 'REJECTED') {
//     console.log('ON REJECTED');
//     onRejected(this.$internalValue);
//   } else {
//     console.log('ON CHAINED');
//     this.$chained.push({ onFulfilled, onRejected });
//   }
// } */

// old resolve method that does not support promise chaining:
// const resolve = (res) => {
//   console.log('IM CURRENTLY RESOLVING');
//   // A promise is considered "settled" when it is no longer
//   // pending, that is, when either `resolve()` or `reject()`
//   // was called once. Calling `resolve()` or `reject()` twice
//   // or calling `reject()` after `resolve()` was already called
//   // are no ops.
//   if (this.$state !== 'PENDING') {
//     return;
//   }
//   this.$state = 'FULFILLED';
//   this.$internalValue = res;

//   // If somebody called `.then()` while this promise was pending, need
//   // to call their `onFulfilled()` function
//   for (const { onFulfilled } of this.$chained) {
//     onFulfilled(res);
//   }
// };

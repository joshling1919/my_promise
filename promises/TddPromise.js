// https://www.mauriciopoppe.com/notes/computer-science/computation/promises/

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class TddPromise {
  constructor(executor) {
    this.state = PENDING;
  }
}

module.exports = TddPromise;

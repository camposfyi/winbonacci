import assert from 'assert';
import fibonacci from '../src/js/lib/fibonacci';

describe('fibonacci.js', () => {

  it ('negative case is zero', () => {
    assert.strictEqual(fibonacci(-1), 0);
  });

  it ('base case (0) is zero', () => {
    assert.strictEqual(fibonacci(0), 0);
  });

  it ('base case (1) is 1', () => {
    assert.strictEqual(fibonacci(1), 1);
  });

  it ('adds results of two previous computations', () => {
    assert.strictEqual(fibonacci(3), 2);
  });

});

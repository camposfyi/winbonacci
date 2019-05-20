const fibonacci = (n, memoization = {}) => {
  if (memoization[n]) return memoization[n];
  if (n === 1) return 1;
  if (n <= 0) return 0;

  return fibonacci(n - 1, memoization) + fibonacci(n - 2, memoization);
};

export default fibonacci;
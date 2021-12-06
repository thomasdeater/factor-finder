export function factors(n) {
  if (isNaN(n) || n < 1) {
    return [];
  }
  let f = [1, n];

  if (n > 3) {
    let i = 2;
    let j = Math.sqrt(n) + 1;

    while (i <= j) {
      if (n % i === 0) {
        f.push(i);
        f.push(n / i);
      }
      i++;
    }
  }
  return [...new Set(f)].sort((a, b) => a - b);
}
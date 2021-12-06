export function factors(n) {
  if (isNaN(n) || n < 1) {
    return [];
  }
  let f = [1, n];
  let o = Math.floor(n / 2);

  if (n >= 4) {
    while (o > 1) {
      if (n % o === 0) {
        f.push(o);
      }
      o--;
    }
  }
  return [...new Set(f)].sort((a, b) => a - b);
}
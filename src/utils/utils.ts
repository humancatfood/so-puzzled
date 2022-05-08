export function times<Result>(n: number, cb: (i: number) => Result) {
  const results: Result[] = new Array(n)
  for (let i = 0; i < n; i += 1) {
    results[i] = cb(i)
  }
  return results
}

// https://en.wikipedia.org/wiki/Linear_congruential_generator
export function makeRNG(seed: number) {
  const m = Math.pow(2, 31) - 1
  const a = 48271
  const c = 1
  const f = (n: number) => (n * a + c) % m
  let X = f(seed)
  return () => {
    X = f(X)
    return (X / 99999999) % 1
  }
}

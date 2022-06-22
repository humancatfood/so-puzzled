import { makeRNG } from '../../utils'

export type NoseOffset = {
  innyOuty: boolean
}

export type NoseOffsetGetter = (x: number, y: number) => NoseOffset

export function makeNoseOffsetGetter(
  numRows: number,
  numCols: number,
): NoseOffsetGetter {
  const rng = makeRNG(numRows * numCols)

  const offsets: NoseOffset[][] = []
  for (let y = 0; y < numCols + 1; y++) {
    offsets[y] = []
    for (let x = 0; x < numRows + 1; x++) {
      offsets[y][x] = {
        innyOuty: rng() > 0.5,
      }
    }
  }

  return (x, y) => offsets[y][x]
}

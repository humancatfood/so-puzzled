type ID = string


export function coordsToId (x: number, y: number): ID {
  return `${x}-${y}`
}


export function getIds(numRows: number, numCols: number): Array<ID> {
  const ids = []
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      ids.push(coordsToId(x, y))
    }
  }
  return ids
}

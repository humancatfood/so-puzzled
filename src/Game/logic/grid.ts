type GridDimensions = {
  numRows: number
  numCols: number
}

export function getGridDimensions(
  width: number,
  height: number,
  ratio: number,
): GridDimensions {
  const pieceSize = Math.min(width, height) / ratio
  return {
    numRows: Math.round(height / pieceSize),
    numCols: Math.round(width / pieceSize),
  }
}

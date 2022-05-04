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
    numRows: height ? Math.round(height / pieceSize) : 0,
    numCols: width ? Math.round(width / pieceSize) : 0,
  }
}

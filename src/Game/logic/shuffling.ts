export type Rect = {
  top: number
  bottom: number
  left: number
  right: number
}

type Coords = {
  top: number
  left: number
}

type ShuffleOptions = {
  stage: Rect
  avoid?: Rect[]
  pieceWidth?: number
  pieceHeight?: number
}

export function shufflePiece({
  stage,
  avoid = [],
  pieceWidth = 0,
  pieceHeight = 0,
}: ShuffleOptions): Coords {
  let tries = 0
  let result: Coords
  const [obstacle] = avoid
  do {
    if (tries++ > 500) {
      throw new Error('timeout!')
    }
    result = {
      top: stage.top + Math.random() * (stage.bottom - stage.top - pieceHeight),
      left:
        stage.left + Math.random() * (stage.right - stage.left - pieceWidth),
    }
  } while (obstacle && isInRect(result, obstacle, pieceWidth, pieceHeight))
  return result
}

export function isInRect(
  { top, left }: Coords,
  rect: Rect,
  pieceWidth: number,
  pieceHeight: number,
): boolean {
  return (
    left < rect.right &&
    left + pieceWidth > rect.left &&
    top + pieceHeight > rect.top &&
    top < rect.bottom
  )
}

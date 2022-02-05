export type Rect = {
  top: number,
  bottom: number,
  left: number,
  right: number,
}

type Coords = {
  top: number, 
  left: number
}


export function shufflePiece(stage: Rect, avoid: Rect[] = []): Coords {

  let tries = 0
  let result: Coords
  const [obstacle] = avoid
  do {
    if (tries++ > 100) {
      throw new Error('timeout!')
    }
    result = {
      top: stage.top + Math.random() * (stage.bottom - stage.top),
      left: stage.left + Math.random() * (stage.right - stage.left),
    }
  }
  while (obstacle && isInRect(result, obstacle)) 
  return result
}

function isInRect({ top, left }: Coords, rect: Rect): boolean {
  return left <= rect.right && left >= rect.left && top >= rect.top && top <= rect.bottom
}
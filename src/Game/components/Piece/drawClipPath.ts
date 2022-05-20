type ClipPathConfig = {
  margin: number
  pieceWidth: number
  pieceHeight: number
  x: number
  y: number
  numRows: number
  numCols: number
}

export function drawClipPath(
  ctx: CanvasRenderingContext2D,
  config: ClipPathConfig,
) {
  const { margin, pieceWidth, pieceHeight, x, y, numRows, numCols } = config
  const isTop = y === 0
  const isBottom = y === numRows - 1
  const isLeft = x === 0
  const isRight = x === numCols - 1

  ctx.beginPath()
  ctx.save()
  ctx.translate(margin, margin)
  ctx.moveTo(0, 0)

  if (!isTop) {
    ctx.lineTo(pieceWidth * 0.4, 0)
    if (y % 2) {
      ctx.bezierCurveTo(
        pieceWidth * 0.5 - margin,
        margin,
        pieceWidth * 0.5 + margin,
        margin,
        pieceWidth * 0.6,
        0,
      )
    } else {
      ctx.bezierCurveTo(
        pieceWidth * 0.5 - margin,
        -margin,
        pieceWidth * 0.5 + margin,
        -margin,
        pieceWidth * 0.6,
        0,
      )
    }
  }
  ctx.lineTo(pieceWidth, 0)

  if (!isRight) {
    ctx.lineTo(pieceWidth, pieceHeight * 0.4)
    if (x % 2) {
      ctx.bezierCurveTo(
        pieceWidth + margin,
        pieceHeight * 0.5 - margin,
        pieceWidth + margin,
        pieceHeight * 0.5 + margin,
        pieceWidth,
        pieceHeight * 0.6,
      )
    } else {
      ctx.bezierCurveTo(
        pieceWidth - margin,
        pieceHeight * 0.5 - margin,
        pieceWidth - margin,
        pieceHeight * 0.5 + margin,
        pieceWidth,
        pieceHeight * 0.6,
      )
    }
  }
  ctx.lineTo(pieceWidth, pieceHeight)

  if (!isBottom) {
    ctx.lineTo(pieceWidth * 0.6, pieceHeight)
    if (y % 2) {
      ctx.bezierCurveTo(
        pieceWidth * 0.5 + margin,
        pieceHeight - margin,
        pieceWidth * 0.5 - margin,
        pieceHeight - margin,
        pieceWidth * 0.4,
        pieceHeight,
      )
    } else {
      ctx.bezierCurveTo(
        pieceWidth * 0.5 + margin,
        pieceHeight + margin,
        pieceWidth * 0.5 - margin,
        pieceHeight + margin,
        pieceWidth * 0.4,
        pieceHeight,
      )
    }
  }
  ctx.lineTo(0, pieceHeight)

  if (!isLeft) {
    ctx.lineTo(0, pieceHeight * 0.6)
    if (x % 2) {
      ctx.bezierCurveTo(
        -margin,
        pieceHeight * 0.5 + margin,
        -margin,
        pieceHeight * 0.5 - margin,
        0,
        pieceHeight * 0.4,
      )
    } else {
      ctx.bezierCurveTo(
        margin,
        pieceHeight * 0.5 + margin,
        margin,
        pieceHeight * 0.5 - margin,
        0,
        pieceHeight * 0.4,
      )
    }
  }
  ctx.lineTo(0, 0)

  ctx.strokeStyle = 'white'
  ctx.lineWidth = 2
  ctx.lineJoin = 'round'
  ctx.stroke()

  ctx.restore()
}

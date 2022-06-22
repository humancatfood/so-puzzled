import { NoseOffsetGetter } from '../../Config/noseOffsets'

type ClipPathConfig = {
  margin: number
  pieceWidth: number
  pieceHeight: number
  x: number
  y: number
  numRows: number
  numCols: number
  getNoseOffset: NoseOffsetGetter
}

export function drawClipPath(
  ctx: CanvasRenderingContext2D,
  config: ClipPathConfig,
) {
  const {
    margin,
    pieceWidth,
    pieceHeight,
    x,
    y,
    numRows,
    numCols,
    getNoseOffset,
  } = config
  const isTop = y === 0
  const isBottom = y === numRows - 1
  const isLeft = x === 0
  const isRight = x === numCols - 1

  ctx.beginPath()
  ctx.save()
  ctx.translate(margin, margin)
  ctx.moveTo(0, 0)

  // const noseOffset = getNoseOffset(x, y)

  if (!isTop) {
    const { innyOuty } = getNoseOffset(x, y - 1)
    ctx.lineTo(pieceWidth * 0.4, 0)
    if (innyOuty) {
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
    const { innyOuty } = getNoseOffset(x, y)
    ctx.lineTo(pieceWidth, pieceHeight * 0.4)
    if (innyOuty) {
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
    const { innyOuty } = getNoseOffset(x, y)
    ctx.lineTo(pieceWidth * 0.6, pieceHeight)
    if (!innyOuty) {
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
    const { innyOuty } = getNoseOffset(x - 1, y)
    ctx.lineTo(0, pieceHeight * 0.6)
    if (!innyOuty) {
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

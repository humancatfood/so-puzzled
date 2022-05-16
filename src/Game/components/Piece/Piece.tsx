import { useEffect, useRef } from 'react'
import { useDrag } from 'react-dnd'

import { useConfig } from '../../Config'
import { IPiece } from '../../State/state'
import { PieceWrapper, PieceCanvas } from './Piece.styled'

type PieceProps = {
  piece: IPiece
}

export function Piece({ piece: { id, x, y, left, top } }: PieceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [{ isDragging }, dragRef] = useDrag({
    type: 'piece',
    item: { id },
    options: {
      dropEffect: 'move',
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const {
    img,
    pieceWidth,
    pieceHeight,
    marginSrc,
    margin,
    pieceWidthSrc,
    pieceHeightSrc,
    numCols,
    numRows,
  } = useConfig()

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    requestAnimationFrame(() => {
      if (ctx) {
        ctx.clearRect(0, 0, 99999, 99999)

        drawClipPath(ctx, {
          margin,
          pieceWidth,
          pieceHeight,
          x,
          y,
          numRows,
          numCols,
        })

        ctx.clip()

        ctx.drawImage(
          img,
          x * pieceWidthSrc - marginSrc,
          y * pieceHeightSrc - marginSrc,
          pieceWidthSrc + 2 * marginSrc,
          pieceHeightSrc + 2 * marginSrc,
          0,
          0,
          pieceWidth + 2 * margin,
          pieceHeight + 2 * margin,
        )
      }
    })
  })

  return (
    <PieceWrapper
      ref={dragRef}
      data-testid={`piece-${id}`}
      style={{
        top: `${top ?? 0}px`,
        left: `${left ?? 0}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {!isDragging && (
        <PieceCanvas
          ref={canvasRef}
          width={pieceWidth + 2 * margin}
          height={pieceHeight + 2 * margin}
          margin={margin}
        />
      )}
    </PieceWrapper>
  )
}

type ClipPathConfig = {
  margin: number
  pieceWidth: number
  pieceHeight: number
  x: number
  y: number
  numRows: number
  numCols: number
}
function drawClipPath(
  ctx: CanvasRenderingContext2D,
  { margin, pieceWidth, pieceHeight, x, y, numRows, numCols }: ClipPathConfig,
) {
  const isTop = y === 0
  const isBottom = y === numRows - 1
  const isLeft = x === 0
  const isRight = x === numCols - 1

  ctx.beginPath()
  ctx.save()
  ctx.translate(margin, margin)
  ctx.moveTo(0, 0)

  if (isTop) {
    ctx.lineTo(pieceWidth, 0)
  } else {
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
    ctx.lineTo(pieceWidth, 0)
  }

  if (isRight) {
    ctx.lineTo(pieceWidth, pieceHeight)
  } else {
    ctx.lineTo(pieceWidth, pieceHeight)
  }

  if (isBottom) {
    ctx.lineTo(0, pieceHeight)
  } else {
    ctx.lineTo(0, pieceHeight)
  }

  if (isLeft) {
    ctx.lineTo(0, 0)
  } else {
    ctx.lineTo(0, 0)
  }

  ctx.closePath()
  ctx.restore()
}

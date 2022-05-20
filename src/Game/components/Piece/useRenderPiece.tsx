import { useEffect, useRef } from 'react'

import { useConfig } from '../../Config'
import { IPiece } from '../../State/state'
import { drawClipPath } from './drawClipPath'

export function useRenderPiece({ x, y }: Pick<IPiece, 'x' | 'y'>) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
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
    const { current: canvas } = canvasRef
    if (canvas) {
      const ctx = canvas.getContext('2d')

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        drawClipPath(ctx, {
          margin,
          pieceWidth,
          pieceHeight,
          x,
          y,
          numRows,
          numCols,
        })
        ctx.save()
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
        ctx.restore()
      }
    }
  }, [
    x,
    y,
    img,
    pieceWidth,
    pieceHeight,
    marginSrc,
    margin,
    pieceWidthSrc,
    pieceHeightSrc,
    numCols,
    numRows,
  ])

  return canvasRef
}

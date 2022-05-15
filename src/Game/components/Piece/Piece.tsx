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
  } = useConfig()

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    requestAnimationFrame(() => {
      if (ctx) {
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

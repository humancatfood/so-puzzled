import { useEffect, useRef } from 'react'
import { useDrag } from 'react-dnd'

import { useConfig } from '../../Config'
import { IPiece } from '../../State/state'
import { PieceWrapper } from './Piece.styled'

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

  const { img, width, height, pieceWidth, pieceHeight } = useConfig()

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    requestAnimationFrame(() => {
      if (ctx) {
        ctx.drawImage(
          img,
          x * pieceWidth * -1,
          y * pieceHeight * -1,
          width,
          height,
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
        <canvas ref={canvasRef} width={pieceWidth} height={pieceHeight} />
      )}
    </PieceWrapper>
  )
}

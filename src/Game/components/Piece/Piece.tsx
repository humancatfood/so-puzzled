import { useEffect, useRef } from 'react'
import { useDrag } from 'react-dnd'

import { useConfig } from '../../Config'
import { PieceWrapper } from './Piece.styled'

type PieceProps = {
  id: string
  offset: { x: number; y: number }
}

export function Piece({ id, offset }: PieceProps) {
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

  const { img, pieces, width, height, pieceWidth, pieceHeight } = useConfig()

  const { x, y } = pieces[id]

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
        top: `${offset.y ?? 0}px`,
        left: `${offset.x ?? 0}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {!isDragging && (
        <canvas ref={canvasRef} width={pieceWidth} height={pieceHeight} />
      )}
    </PieceWrapper>
  )
}

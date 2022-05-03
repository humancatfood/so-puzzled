import { useEffect, useRef } from 'react'
import { useDrag } from 'react-dnd'

import { useConfig } from '../../Config'
import { PieceWrapper } from './Piece.styled'

type PieceProps = {
  id: string
  left: number
  top: number
  img: HTMLImageElement
  offset: { x: number; y: number }
}

export function Piece({ id, left, top, img, offset }: PieceProps) {
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

  const { width, height, pieceWidth, pieceHeight } = useConfig()

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    requestAnimationFrame(() => {
      if (ctx) {
        ctx.drawImage(img, left, top, width, height)
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

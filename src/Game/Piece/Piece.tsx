import { useEffect, useRef } from 'react'
import { useDrag } from 'react-dnd'
import { PieceWrapper } from './Piece.styled'

type PieceProps = {
  id: string
  width: number
  height: number
  pieceWidth: number
  pieceHeight: number
  left: number
  top: number
  img: HTMLImageElement
  offset: { x: number; y: number }
}

export function Piece({
  id,
  width,
  height,
  left,
  top,
  img,
  pieceWidth,
  pieceHeight,
  offset,
}: PieceProps) {
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

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    requestAnimationFrame(() => {
      ctx?.drawImage(img, left, top, width, height)
    })
  })

  return (
    <PieceWrapper
      ref={dragRef}
      style={{
        width: `${pieceWidth}px`,
        height: `${pieceHeight}px`,
        top: `${offset.y ?? 0}px`,
        left: `${offset.x ?? 0}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {!isDragging && (
        <canvas
          data-id={id}
          ref={canvasRef}
          width={pieceWidth}
          height={pieceHeight}
        />
      )}
    </PieceWrapper>
  )
}

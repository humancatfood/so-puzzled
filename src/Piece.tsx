import { useEffect, useRef } from 'react'
import { useDrag } from 'react-dnd'


type PieceProps = {
  id: string
  width: number
  height: number
  pieceWidth: number
  pieceHeight: number
  left: number
  top: number
  img: HTMLImageElement
}


export default function Piece({ id, width, height, left, top, img, pieceWidth, pieceHeight }: PieceProps) {

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
    <div
      ref={dragRef}
      style={{
        display: 'block',
        height: '100%',
        position: 'relative',
        // left: offset?.x || 0,
        // top: offset?.y || 0,
      }}>
      {!isDragging && (
        <canvas
          className="piece-wrapper animated"
          data-id={id}
          ref={canvasRef}
          width={pieceWidth}
          height={pieceHeight}
        />
      )}
    </div>
  )

}

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
  offset: {x: number, y: number}
}


export default function Piece({ id, width, height, left, top, img, pieceWidth, pieceHeight, offset }: PieceProps) {

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
        position: 'absolute',
        width: `${pieceWidth}px`,
        height: `${pieceHeight}px`,
        top: `${offset.y ?? 0}px`,
        left: `${offset.x ?? 0}px`,
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
    </div>
  )

}

import { useEffect, useRef } from 'react'


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

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    ctx?.drawImage(img, left, top, width, height)
  }, [width, height, left, top, img])

  return (
    <canvas
      className="piece-wrapper animated"
      data-id={id}
      ref={canvasRef}
      width={pieceWidth}
      height={pieceHeight}
    />
  )

}

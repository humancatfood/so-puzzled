import { useConfig } from '../../Config'
import { IPiece } from '../../State'
import { PieceCanvas } from './Piece.styled'
import { useRenderPiece } from './useRenderPiece'

type Props = {
  piece: IPiece
}

export function Piece({ piece: { x, y } }: Props) {
  const { margin, pieceWidth, pieceHeight } = useConfig()

  const canvasRef = useRenderPiece({ x, y })

  return (
    <PieceCanvas
      ref={canvasRef}
      width={pieceWidth + 2 * margin}
      height={pieceHeight + 2 * margin}
      margin={margin}
    />
  )
}

import { useDrag } from 'react-dnd'

import { useConfig } from '../../Config'
import { IPiece } from '../../State/state'
import { PieceWrapper, PieceCanvas } from './Piece.styled'
import { useRenderPiece } from './useRenderPiece'

type PieceProps = {
  piece: IPiece
}

export function Piece({ piece: { id, x, y, left, top } }: PieceProps) {
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

  const { margin, pieceWidth, pieceHeight } = useConfig()

  const canvasRef = useRenderPiece({ x, y })

  if (isDragging) {
    return null
  }

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
      <PieceCanvas
        ref={canvasRef}
        width={pieceWidth + 2 * margin}
        height={pieceHeight + 2 * margin}
        margin={margin}
      />
    </PieceWrapper>
  )
}

import type { XYCoord } from 'react-dnd'
import { useDragLayer } from 'react-dnd'

import { Piece } from './Piece'
import { Draglayer, PieceWrapper } from './Piece.styled'

function getItemStyles(currentOffset: XYCoord | null) {
  if (!currentOffset) {
    return {
      display: 'none',
    }
  }

  const { x, y } = currentOffset

  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}

export function DragPiece() {
  const { itemType, isDragging, item, currentOffset } = useDragLayer(
    monitor => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }),
  )

  if (!isDragging || itemType !== 'piece') {
    return null
  }

  return (
    <Draglayer>
      <PieceWrapper
        style={{
          ...getItemStyles(currentOffset),
          cursor: 'grabbing',
        }}
      >
        <Piece piece={item} />
      </PieceWrapper>
    </Draglayer>
  )
}

import { PropsWithChildren } from 'react'
import { useDrop } from 'react-dnd'
import { coordsToId } from '../../../utils'
import { useGameState } from '../../State'
import { Piece } from '../Piece'

import { SlotWrapper } from './Slot.styled'

type SlotProps = {
  x: number
  y: number
}

export function Slot({ x, y }: PropsWithChildren<SlotProps>) {
  const { getSlotPiece, movePieceToSlot } = useGameState()

  const slotId = coordsToId(x, y)
  const pieceInSlot = getSlotPiece(slotId)
  const onDropPiece = (pieceId: string) => movePieceToSlot(pieceId, slotId)

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'piece',
    collect: monitor => {
      // console.log(monitor.getSourceClientOffset())
      return {
        isOver: monitor.isOver(),
      }
    },
    drop: (item: { id: string }) => {
      // debugger
      onDropPiece(item.id)
    },
  }))

  return (
    <SlotWrapper ref={dropRef} isHighlighted={isOver}>
      {pieceInSlot ? <Piece piece={pieceInSlot} /> : null}
    </SlotWrapper>
  )
}

import { PropsWithChildren } from 'react'

import { useDrop } from 'react-dnd'
import { StaticPiece } from '..'
import { coordsToId } from '../../../utils'
import { useGameState } from '../../State'
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
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
    drop: (item: { id: string }) => {
      onDropPiece(item.id)
    },
  }))

  return (
    <SlotWrapper ref={dropRef} isHighlighted={isOver}>
      {pieceInSlot ? <StaticPiece piece={pieceInSlot} /> : null}
    </SlotWrapper>
  )
}

import { PropsWithChildren } from 'react'
import { useDrop } from 'react-dnd'

import { SlotWrapper } from './Slot.styled'

type SlotProps = {
  onDropPiece: (itemId: string) => void
}

export function Slot({ onDropPiece, children }: PropsWithChildren<SlotProps>) {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'piece',
    collect: monitor => {
      // console.log(monitor.getSourceClientOffset())
      return {
        isOver: monitor.isOver(),
      }
    },
    drop: (item: { id: string }, monitor) => {
      // debugger
      onDropPiece(item.id)
    },
  }))

  return (
    <SlotWrapper ref={dropRef} isHighlighted={isOver}>
      {children}
    </SlotWrapper>
  )
}

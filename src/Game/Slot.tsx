import { PropsWithChildren } from 'react'
import { useDrop } from 'react-dnd'


type SlotProps = {
  onDropPiece: (itemId: string) => void
}

export default function Slot({ onDropPiece, children }: PropsWithChildren<SlotProps>) {

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'piece',
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
    drop: (item: {id: string}) => onDropPiece(item.id),
  }))

  return (
    <div
      ref={dropRef}
      style={{
        display: 'block',
        height: '100%',
        outline: isOver ? '3px solid rebeccapurple' : 'none',
      }}
    >
      {children}
    </div>
  )

}

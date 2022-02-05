import { PropsWithChildren } from 'react'
import { useDrop } from 'react-dnd'

type StageProps = {
  onDropPiece: (itemId: string, top: number, left: number) => void
}

export default function Stage({
  onDropPiece,
  children,
}: PropsWithChildren<StageProps>) {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'piece',
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
    drop: (item: { id: string }, monitor) => {
      if (!monitor.didDrop()) {
        const offset = monitor.getSourceClientOffset()
        onDropPiece(item.id, offset?.y ?? 0, offset?.x ?? 0)
      }
    },
  }))

  return (
    <div
      className="container stage"
      style={{
        boxShadow: isOver ? '0px 0px 16px green inset' : 'none',
      }}
      ref={dropRef}
    >
      {children}
    </div>
  )
}

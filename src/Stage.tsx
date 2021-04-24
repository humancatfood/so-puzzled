import { PropsWithChildren } from 'react'
import { useDrop } from 'react-dnd'


type StageProps = {
  onDropPiece: (itemId: string) => void
}

export default function Stage({ onDropPiece, children }: PropsWithChildren<StageProps>) {

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'piece',
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
    drop: (item: {id: string}) => onDropPiece(item.id),
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

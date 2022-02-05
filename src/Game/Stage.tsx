import { PropsWithChildren, forwardRef, useEffect, useRef, useImperativeHandle } from 'react'
import { useDrop } from 'react-dnd'

type StageProps = PropsWithChildren<{
  onDropPiece: (itemId: string, top: number, left: number) => void
}>


type Ref = HTMLDivElement | null

export default forwardRef<Ref, StageProps>(function Stage(props, forwardedRef) {
  const ref = useRef<HTMLDivElement>(null)
  
  const {
    onDropPiece,
    children,
  } = props
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

  useEffect(() => {
    dropRef(ref)
  })

  useImperativeHandle<Ref, Ref>(forwardedRef, () => ref.current)
  

  return (
    <div
      className="container stage"
      style={{
        boxShadow: isOver ? '0px 0px 16px green inset' : 'none',
      }}
      ref={ref}
    >
      {children}
    </div>
  )
})

import { useRef, useEffect } from 'react'
import { useElementSize } from '../utils'

type Dimensions = {
  width: number
  height: number
}

type ReferenceImageProps = {
  img: HTMLImageElement
  onResize: (dimensions: Dimensions) => void
  transparent?: boolean
  semiTransparent?: boolean
}

export default function ReferenceImage(props: ReferenceImageProps) {
  const { img, onResize, transparent = true, semiTransparent } = props

  const imgRef = useRef<HTMLImageElement>(null)

  const [width, height] = useElementSize(imgRef.current)

  useEffect(() => onResize({ width, height }), [onResize, width, height])

  return (
    <img
      alt="Kitty"
      src={img.src}
      className={`
        base-img
        ${transparent ? 'transparent' : ''}
        ${semiTransparent ? 'semi-transparent' : ''}
      `}
      ref={imgRef}
    />
  )
}

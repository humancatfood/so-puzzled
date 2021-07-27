import { useRef, useEffect } from 'react'
import { useElementSize } from '../utils'

type Dimensions = {
  width: number
  height: number
}

type ReferenceImageProps = {
  imgSrc: string
  onResize: (dimensions: Dimensions) => void
  transparent?: boolean
  semiTransparent?: boolean
}

export default function ReferenceImage(props: ReferenceImageProps) {
  const { imgSrc, onResize, transparent = true, semiTransparent } = props

  const imgRef = useRef<HTMLImageElement>(null)

  const [width, height] = useElementSize(imgRef.current)

  useEffect(() => onResize({ width, height }), [onResize, width, height])

  return (
    <img
      alt="Kitty"
      src={imgSrc}
      className={`
        base-img
        ${transparent ? 'transparent' : ''}
        ${semiTransparent ? 'semi-transparent' : ''}
      `}
      ref={imgRef}
    />
  )
}

import { useRef, useEffect } from 'react'
import { useElementSize } from '../../utils'
import { Image } from './ReferenceImage.styled'

type Dimensions = {
  width: number
  height: number
}

type ReferenceImageProps = {
  img: HTMLImageElement
  onResize: (dimensions: Dimensions) => void
  show?: boolean
  hint?: boolean
}

export function ReferenceImage({
  img,
  onResize,
  show = false,
  hint = false,
}: ReferenceImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)

  const [width, height] = useElementSize(imgRef.current)

  useEffect(() => onResize({ width, height }), [onResize, width, height])

  return <Image src={img.src} show={show} hint={hint} ref={imgRef} />
}

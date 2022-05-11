import { useRef, useEffect } from 'react'
import { useElementSize } from '../../../utils'
import { useConfig } from '../../Config'
import { Image } from './ReferenceImage.styled'

type ReferenceImageProps = {
  show?: boolean
  hint?: boolean
}

export function ReferenceImage({
  show = false,
  hint = false,
}: ReferenceImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)

  const [width, height] = useElementSize(imgRef.current)

  const { img, setImageSize } = useConfig()

  useEffect(() => {
    setImageSize({ width, height })
  }, [width, height, setImageSize])

  return <Image src={img.src} show={show} hint={hint} ref={imgRef} />
}

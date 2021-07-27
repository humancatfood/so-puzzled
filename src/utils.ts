import { useEffect, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

type Size = [number, number]

export function useElementSize(element: HTMLElement | null): Size {
  const [size, setSize] = useState<Size>([0, 0])
  useEffect(() => {
    if (element) {
      const observer = new ResizeObserver(
        (entries: Array<ResizeObserverEntry>) => {
          const { contentRect } = entries[0]
          setSize([contentRect.width, contentRect.height])
        },
      )
      observer.observe(element)
      return () => observer.unobserve(element)
    }
  }, [element])
  return size
}

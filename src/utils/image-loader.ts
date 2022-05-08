import { useEffect, useState } from 'react'

export function useImageLoader(src: string) {
  const [{ img, error, isLoading }, setState] = useState<{
    img?: HTMLImageElement
    error?: string
    isLoading?: boolean
  }>({})

  useEffect(() => {
    setState(state => ({ ...state, error: undefined, isLoading: true }))
    const img = new Image()
    img.addEventListener('load', () =>
      setState({ img, error: undefined, isLoading: false }),
    )
    img.addEventListener('error', ({ message }) =>
      setState(state => ({
        ...state,
        error: message || 'image could not be loaded :(',
        isLoading: false,
      })),
    )
    img.src = src
  }, [src])

  return {
    error,
    img,
    isLoading,
  }
}

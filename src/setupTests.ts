import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react-hooks'
import '@testing-library/jest-dom'
import {
  useState as useStateOriginal,
  useEffect as useEffectOriginal,
} from 'react'

jest.mock('./utils', () => {
  const original = jest.requireActual('./utils')
  const {
    useState,
    useEffect,
  }: {
    useState: typeof useStateOriginal
    useEffect: typeof useEffectOriginal
  } = jest.requireActual('react')

  function useMockImageLoader(src: string) {
    const [{ img, error, isLoading }, setState] = useState<{
      img?: HTMLElement
      error?: any
      isLoading?: boolean
    }>({})

    useEffect(() => {
      setState(state => ({
        ...state,
        error: undefined,
        isLoading: true,
      }))
      setTimeout(() => {
        const img = {
          ...global.document.createElement('IMG'),
          src,
        }
        setState({ img, error: undefined, isLoading: false })
      })
    }, [src])

    return {
      error,
      img,
      isLoading,
    }
  }

  function useMockElementSize(
    element: HTMLImageElement | null,
  ): [number, number] {
    const [size, setSize] = useState<[number, number]>([0, 0])

    useEffect(() => {
      if (element) {
        const timeoutId = setTimeout(() => {
          const { width, height } = element.src.match(
            /(?<width>\d+)x(?<height>\d+)/,
          )?.groups || {
            width: '100',
            height: '100',
          }
          setSize([parseInt(width), parseInt(height)])
        }, 1)
        return () => clearTimeout(timeoutId)
      }
    }, [element])

    return size
  }

  return {
    ...original,
    useElementSize: useMockElementSize,
    useImageLoader: useMockImageLoader,
  }
})

HTMLCanvasElement.prototype.getContext = jest.fn()

afterEach(() => {
  cleanup()
})

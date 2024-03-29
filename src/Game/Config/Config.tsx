import {
  createContext,
  useContext,
  useMemo,
  useState,
  PropsWithChildren,
} from 'react'
import { getGridDimensions } from './grid'
import { makeNoseOffsetGetter } from './noseOffsets'

type Props = {
  img: HTMLImageElement
  difficulty: number
}

type ConfigContext = {
  numCols: number
  numRows: number
  imgWidth: number
  imgHeight: number
  pieceWidth: number
  pieceHeight: number
  pieceWidthSrc: number
  pieceHeightSrc: number
  margin: number
  marginSrc: number
  setImageSize: (size: { width: number; height: number }) => void
  getNoseOffset: ReturnType<typeof makeNoseOffsetGetter>
} & Props

const Context = createContext<ConfigContext | null>(null)

export function ConfigProvider({
  img,
  difficulty = 2,
  ...otherProps
}: PropsWithChildren<Props>) {
  const [{ width: imgWidth, height: imgHeight }, setImageSize] = useState<{
    width: number
    height: number
  }>(img)

  const value = useMemo(() => {
    const { numRows, numCols } = getGridDimensions(
      imgWidth,
      imgHeight,
      difficulty,
    )

    const pieceWidth = imgWidth / numCols
    const pieceHeight = imgHeight / numRows

    const pieceWidthSrc = img.width / numCols
    const pieceHeightSrc = img.height / numRows

    const margin = Math.min(pieceWidth, pieceHeight) * 0.3
    const marginSrc = Math.min(pieceWidthSrc, pieceHeightSrc) * 0.3

    const getNoseOffset = makeNoseOffsetGetter(numRows, numCols)

    return {
      img,
      difficulty,
      numRows,
      numCols,
      imgWidth,
      imgHeight,
      pieceWidth,
      pieceHeight,
      pieceWidthSrc,
      pieceHeightSrc,
      margin,
      marginSrc,
      setImageSize,
      getNoseOffset,
    }
  }, [img, imgWidth, imgHeight, difficulty])

  return <Context.Provider value={value} {...otherProps} />
}

export function useConfig(): ConfigContext {
  const instance = useContext<ConfigContext | null>(Context)
  if (!instance) {
    throw new Error('`useConfig` must be called within `ConfigProvider`')
  }
  return instance
}

import {
  createContext,
  useContext,
  useMemo,
  useState,
  PropsWithChildren,
} from 'react'
import { getGridDimensions } from './grid'

type GameProps = {
  img: HTMLImageElement
  difficulty: number
}

type GameInfo = {
  pieceWidth: number
  pieceHeight: number
  width: number
  height: number
}

function getGameInfo(
  width: number,
  height: number,
  difficulty: number,
): GameInfo {
  const { numRows, numCols } = getGridDimensions(width, height, difficulty)

  const pieceWidth = width / numCols
  const pieceHeight = height / numRows

  return {
    pieceWidth,
    pieceHeight,
    width,
    height,
  }
}

type ConfigContext = {
  imgWidth: number
  imgHeight: number
  setImageSize: (size: { width: number; height: number }) => void
  numCols: number
  numRows: number
} & GameInfo &
  GameProps

const Context = createContext<ConfigContext | null>(null)

export function ConfigProvider({
  img,
  difficulty = 2,
  ...otherProps
}: PropsWithChildren<GameProps>) {
  const [{ width: imgWidth, height: imgHeight }, setImageSize] = useState<{
    width: number
    height: number
  }>(img)

  const gameInfo = getGameInfo(imgWidth, imgHeight, difficulty)

  const { numCols, numRows } = useMemo(
    () => getGridDimensions(imgWidth, imgHeight, difficulty),
    [imgWidth, imgHeight, difficulty],
  )

  return (
    <Context.Provider
      value={{
        ...gameInfo,
        imgWidth,
        imgHeight,
        setImageSize,
        numCols,
        numRows,
        img,
        difficulty,
      }}
      {...otherProps}
    />
  )
}

export function useConfig(): ConfigContext {
  const instance = useContext<ConfigContext | null>(Context)
  if (!instance) {
    throw new Error('`useConfig` must be called within `ConfigProvider`')
  }
  return instance
}

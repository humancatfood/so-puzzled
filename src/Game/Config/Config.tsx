import {
  createContext,
  useContext,
  useMemo,
  useState,
  PropsWithChildren,
} from 'react'
import { getGridDimensions, getIds, coordsToId } from '../logic'

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

type PieceParams = {
  x: number
  y: number
}

function getPieces(
  numCols: number,
  numRows: number,
): Record<string, PieceParams> {
  const pieces: Record<string, PieceParams> = {}
  for (let y = 0; y < numRows; y += 1) {
    for (let x = 0; x < numCols; x += 1) {
      const id = coordsToId(x, y)
      pieces[id] = { x, y }
    }
  }
  return pieces
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
  ids: string[]
  pieces: Record<string, PieceParams>
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

  const ids = useMemo(() => getIds(numRows, numCols), [numCols, numRows])

  const pieces = useMemo(() => getPieces(numCols, numRows), [numCols, numRows])

  return (
    <Context.Provider
      value={{
        ...gameInfo,
        imgWidth,
        imgHeight,
        setImageSize,
        numCols,
        numRows,
        ids,
        pieces,
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

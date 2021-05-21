import { useMemo, useState, ReactElement } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


import GameGrid from './Grid'
import Piece from './Piece'
import ReferenceImage from './ReferenceImage'
import Slot from './Slot'
import Stage from './Stage'
import { useGameState, getGridDimensions, getIds } from './logic'
import { coordsToId } from '../utils'

type GameProps = {
  imgSrc: string
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

function Game({ imgSrc, difficulty = 2 }: GameProps) {

  const [showHelp] = useState<boolean>(false)

  const [isStarted, setStarted] = useState<boolean>(false)

  const [{ width: imgWidth, height: imgHeight }, setImageSize] = useState<{width: number, height: number}>({ width: 0, height: 0 })

  const onLoadReferenceImage = () =>
    setTimeout(function () {
      setStarted(true)
    }, 2000)

  const img = useMemo(() => {
    const img = new Image(imgWidth, imgHeight)
    img.src = imgSrc
    return img
  }, [imgWidth, imgHeight, imgSrc])

  const gameInfo = getGameInfo(imgWidth, imgHeight, difficulty)

  const { numCols, numRows } = useMemo(
    () => getGridDimensions(imgWidth, imgHeight, difficulty),
    [imgWidth, imgHeight, difficulty],
  )

  const ids = useMemo(() => getIds(numRows, numCols), [numCols, numRows])

  const pieces = useMemo(
    () => getPieces(numCols, numRows),
    [numCols, numRows],
  )

  const { getSlotPiece, getStagePieces, movePieceToStage, movePieceToSlot } = useGameState(ids)

  function renderSlot(x: number, y: number): ReactElement {
    const slotId = coordsToId(x, y)
    const pieceInSlot = getSlotPiece(slotId)
    const onDropPiece = (pieceId: string) => movePieceToSlot(pieceId, slotId)

    if (pieceInSlot) {
      const { id } = pieceInSlot
      const { x, y } = pieces[id]
      const { width, height, pieceWidth, pieceHeight } = gameInfo
      return (
        <Slot onDropPiece={onDropPiece}>
          <Piece
            id={id}
            pieceWidth={pieceWidth}
            pieceHeight={pieceHeight}
            width={width}
            height={height}
            left={x * pieceWidth * -1}
            top={y * pieceHeight * -1}
            img={img}
            offset={{ x: 0, y: 0 }}
          />
        </Slot>
      )
    } else {
      return <Slot onDropPiece={onDropPiece} />
    }
  }

  return (
    <>
      <Stage onDropPiece={movePieceToStage} />
      <div className="grid-wrapper">
        <ReferenceImage
          imgSrc={imgSrc}
          transparent={isStarted}
          semiTransparent={showHelp}
          onLoad={() => onLoadReferenceImage()}
          onResize={setImageSize}
        />
        {isStarted && (
          <GameGrid
            width={imgWidth}
            height={imgHeight}
            pieceSizeRatio={difficulty}
            renderSlot={renderSlot}
          />
        )}
      </div>
      {getStagePieces().map(({ id, top, left }) => {
        const { width, height, pieceWidth, pieceHeight } = gameInfo
        const { x, y } = pieces[id]
        return (
          <Piece
            key={id}
            id={id}
            pieceWidth={pieceWidth}
            pieceHeight={pieceHeight}
            width={width}
            height={height}
            left={x * pieceWidth * -1}
            top={y * pieceHeight * -1}
            img={img}
            offset={{ x: left, y: top }}
          />
        )
      })}
    </>
  )
}

export default function GameWrapper(props: GameProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Game {...props} />
    </DndProvider>
  )
}

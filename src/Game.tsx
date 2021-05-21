import { useMemo, useState, ReactElement } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


import GameGrid from './Grid'
import Piece from './Piece'
import ReferenceImage from './ReferenceImage'
import Slot from './Slot'
import Stage from './Stage'
import { useGameState, getGridDimensions, getIds } from './logic'
import { coordsToId } from './utils'

type GameProps = {
  imgSrc: string
  difficulty: number
}

type PieceParams = {
  id: string
  pieceWidth: number
  pieceHeight: number
  width: number
  height: number
  left: number
  top: number
}

function getPieces(
  width: number,
  height: number,
  numCols: number,
  numRows: number,
): Record<string, PieceParams> {
  const pieces: Record<string, PieceParams> = {}

  if (!width || !height) {
    return pieces
  }

  const pieceWidth = width / numCols
  const pieceHeight = height / numRows

  Array(numRows)
    .fill(0)
    .forEach((_, y) => {
      Array(numCols)
        .fill(0)
        .forEach((_, x) => {
          const id = coordsToId(x, y)
          pieces[id] = {
            id,
            pieceWidth,
            pieceHeight,
            width,
            height,
            left: x * pieceWidth * -1,
            top: y * pieceHeight * -1,
          }
        })
    })
  return pieces
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

  const { numCols, numRows } = useMemo(
    () => getGridDimensions(imgWidth, imgHeight, difficulty),
    [imgWidth, imgHeight, difficulty],
  )

  const ids = useMemo(() => getIds(numRows, numCols), [numCols, numRows])

  const pieces = useMemo(
    () => getPieces(imgWidth, imgHeight, numCols, numRows),
    [imgWidth, imgHeight, numCols, numRows],
  )

  const { getSlotPiece, getStagePieces, movePieceToStage, movePieceToSlot } = useGameState(ids)

  function renderSlot(slotId: string): ReactElement {
    const piece = getSlotPiece(slotId)
    const onDropPiece = (pieceId: string) => movePieceToSlot(pieceId, slotId)

    if (piece) {
      const { id, top: y, left: x } = piece
      const { width, height, pieceWidth, pieceHeight, left, top } = pieces[id]
      return (
        <Slot onDropPiece={onDropPiece}>
          <Piece
            id={id}
            pieceWidth={pieceWidth}
            pieceHeight={pieceHeight}
            width={width}
            height={height}
            left={left}
            top={top}
            img={img}
            offset={{ x, y }}
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
      {getStagePieces().map(({ id, top: y, left: x }) => {
        const { width, height, pieceWidth, pieceHeight, left, top } =
            pieces[id]
        return (
          <Piece
            key={id}
            id={id}
            pieceWidth={pieceWidth}
            pieceHeight={pieceHeight}
            width={width}
            height={height}
            left={left}
            top={top}
            img={img}
            offset={{ x, y }}
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

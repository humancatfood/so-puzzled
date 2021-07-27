import { useMemo, useState, ReactElement } from 'react'

import GameGrid from './Grid'
import Piece from './Piece'
import ReferenceImage from './ReferenceImage'
import Slot from './Slot'
import Stage from './Stage'
import { useGameState, getGridDimensions, getIds, coordsToId } from './logic'

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

export default function Game({ img, difficulty = 2 }: GameProps) {
  const [showHelp] = useState<boolean>(false)

  const [{ width: imgWidth, height: imgHeight }, setImageSize] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })

  const gameInfo = getGameInfo(imgWidth, imgHeight, difficulty)

  const { numCols, numRows } = useMemo(
    () => getGridDimensions(imgWidth, imgHeight, difficulty),
    [imgWidth, imgHeight, difficulty],
  )

  const ids = useMemo(() => getIds(numRows, numCols), [numCols, numRows])

  const pieces = useMemo(() => getPieces(numCols, numRows), [numCols, numRows])

  const { getSlotPiece, getStagePieces, movePieceToStage, movePieceToSlot } =
    useGameState(ids)

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
          imgSrc={img.src}
          semiTransparent={showHelp}
          onResize={setImageSize}
        />
        <GameGrid
          width={imgWidth}
          height={imgHeight}
          pieceSizeRatio={difficulty}
          renderSlot={renderSlot}
        />
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

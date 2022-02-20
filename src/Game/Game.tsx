import { useState, ReactElement, useEffect, useRef, useMemo } from 'react'

import { Grid } from './Grid'
import { Piece } from './Piece'
import { ReferenceImage } from './ReferenceImage'
import { Slot } from './Slot'
import { Stage } from './Stage'
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
  numRows: number
  numCols: number
  ids: string[]
  pieces: Record<string, PieceParams>
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

  const ids = getIds(numRows, numCols)
  const pieces = getPieces(numCols, numRows)

  return {
    pieceWidth,
    pieceHeight,
    width,
    height,
    numRows,
    numCols,
    ids,
    pieces,
  }
}

function useGameInfo(difficulty: number) {
  const [{ width, height }, setImageSize] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })

  const gameInfo = useMemo(
    () => getGameInfo(width, height, difficulty),
    [width, height, difficulty],
  )

  return {
    ...gameInfo,
    setImageSize,
    imgWidth: width,
    imgHeight: height,
  }
}

export function Game({ img, difficulty = 2 }: GameProps) {
  const [showHelp] = useState<boolean>(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const {
    ids,
    pieceWidth,
    pieceHeight,
    pieces,
    width,
    height,
    numCols,
    numRows,
    setImageSize,
  } = useGameInfo(difficulty)

  const {
    isSolved,
    stagePieces,
    piecesToShuffle,
    getSlotPiece,
    markPiecesToBeShuffled,
    movePieceToStage,
    movePieceToSlot,
    debug,
    shufflePieces,
  } = useGameState(ids)

  useEffect(() => {
    if (piecesToShuffle.length && stageRef.current) {
      shufflePieces(
        stageRef.current?.getBoundingClientRect().toJSON(),
        [gridRef.current?.getBoundingClientRect().toJSON()],
        pieceWidth,
        pieceHeight,
      )
    }
  }, [piecesToShuffle, shufflePieces, pieceWidth, pieceHeight])

  useEffect(() => {
    if (isSolved) {
      // markPiecesToBeShuffled(ids)
    }
  }, [isSolved, markPiecesToBeShuffled, ids])

  function renderSlot(x: number, y: number): ReactElement {
    const slotId = coordsToId(x, y)
    const pieceInSlot = getSlotPiece(slotId)
    const onDropPiece = (pieceId: string) => movePieceToSlot(pieceId, slotId)

    if (pieceInSlot) {
      const { id } = pieceInSlot
      const { x, y } = pieces[id]
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

  debug?.()

  return (
    <>
      <p style={{ color: 'white' }}>Solved: {isSolved.toString()}</p>
      <Stage onDropPiece={movePieceToStage} ref={stageRef}>
        <div className="grid-wrapper" ref={gridRef}>
          <ReferenceImage img={img} hint={showHelp} onResize={setImageSize} />
          <Grid numCols={numCols} numRows={numRows} renderSlot={renderSlot} />
        </div>
        {stagePieces.map(({ id, top, left }) => {
          const { x, y } = pieces[id]
          if (top != null && left != null) {
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
          }
        })}
      </Stage>
    </>
  )
}

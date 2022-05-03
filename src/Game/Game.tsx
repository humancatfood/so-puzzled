import { useState, ReactElement, useEffect, useRef } from 'react'

import { useConfig } from './Config'
import { Grid } from './Grid'
import { Piece } from './Piece'
import { ReferenceImage } from './ReferenceImage'
import { Slot } from './Slot'
import { Stage } from './Stage'
import { useGameState, coordsToId } from './logic'

type GameProps = {
  img: HTMLImageElement
}

export function Game({ img }: GameProps) {
  const [showHelp] = useState<boolean>(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const config = useConfig()

  const { ids, pieceWidth, pieceHeight, pieces, numCols, numRows } = config

  const {
    isSolved,
    stagePieces,
    piecesToShuffle,
    getSlotPiece,
    markPiecesToBeShuffled,
    movePieceToStage,
    movePieceToSlot,
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
      <p style={{ color: 'white' }}>Solved: {isSolved.toString()}</p>
      <Stage onDropPiece={movePieceToStage} ref={stageRef}>
        <div className="grid-wrapper" ref={gridRef}>
          <ReferenceImage img={img} hint={showHelp} />
          <Grid numCols={numCols} numRows={numRows} renderSlot={renderSlot} />
        </div>
        {stagePieces.map(({ id, top, left }) => {
          const { x, y } = pieces[id]
          if (top != null && left != null) {
            return (
              <Piece
                key={id}
                id={id}
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

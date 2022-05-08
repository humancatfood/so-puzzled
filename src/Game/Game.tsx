import { useState, useEffect, useRef } from 'react'

import { useConfig } from './Config'
import { useGameState } from './State'
import { Grid, GridWrapper, ReferenceImage, Stage } from './components'

export function Game() {
  const [showHelp] = useState<boolean>(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const { ids, pieceWidth, pieceHeight, numCols, numRows, img } = useConfig()

  const {
    isSolved,
    piecesToShuffle,
    markPiecesToBeShuffled,
    movePieceToStage,
    shufflePieces,
    reset,
  } = useGameState()

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

  useEffect(() => {
    reset(ids)
  }, [ids])

  return (
    <>
      <p style={{ color: 'white' }}>Solved: {isSolved.toString()}</p>
      <Stage onDropPiece={movePieceToStage} ref={stageRef}>
        <GridWrapper ref={gridRef}>
          <ReferenceImage img={img} hint={showHelp} />
          <Grid numCols={numCols} numRows={numRows} />
        </GridWrapper>
      </Stage>
    </>
  )
}

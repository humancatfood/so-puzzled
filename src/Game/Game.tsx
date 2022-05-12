import { useState, useEffect, useRef } from 'react'

import { useConfig } from './Config'
import { useGameState } from './State'
import { Grid, GridWrapper, ReferenceImage, Stage } from './components'

export function Game() {
  const [showHelp] = useState<boolean>(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const { numRows, numCols, pieceWidth, pieceHeight } = useConfig()

  const {
    isSolved,
    piecesToShuffle,
    // markPiecesToBeShuffled,
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

  // useEffect(() => {
  //   if (isSolved) {
  //     markPiecesToBeShuffled(ids)
  //   }
  // }, [isSolved, markPiecesToBeShuffled, ids])

  useEffect(() => {
    reset(numRows, numCols)
  }, [numRows, numCols])

  return (
    <>
      <p style={{ color: 'white' }}>Solved: {isSolved.toString()}</p>
      <Stage ref={stageRef}>
        <GridWrapper ref={gridRef}>
          <ReferenceImage hint={showHelp} />
          <Grid />
        </GridWrapper>
      </Stage>
    </>
  )
}

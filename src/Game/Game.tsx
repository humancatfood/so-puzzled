import { useState, useEffect, useRef } from 'react'

import { useConfig } from './Config'
import { useGameState } from './State'
import {
  DragPiece,
  Grid,
  GridWrapper,
  ReferenceImage,
  Stage,
} from './components'

export function Game() {
  const [showHelp] = useState<boolean>(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const { numRows, numCols, pieceWidth, pieceHeight } = useConfig()

  const {
    isSolved,
    piecesToShuffle,
    // markAllPiecesToBeShuffled,
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
    reset(numRows, numCols)
  }, [numRows, numCols])

  // useEffect(() => {
  //   if (isSolved) {
  //     markAllPiecesToBeShuffled()
  //   }
  // }, [isSolved])

  return (
    <>
      <p style={{ color: 'white' }}>Solved: {isSolved.toString()}</p>
      <Stage ref={stageRef}>
        <GridWrapper ref={gridRef}>
          <ReferenceImage hint={showHelp} />
          <Grid />
        </GridWrapper>
        <DragPiece />
      </Stage>
    </>
  )
}

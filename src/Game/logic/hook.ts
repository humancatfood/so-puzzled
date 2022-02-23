import { useState, useEffect } from 'react'

import { Rect } from './shuffling'

import {
  createState,
  movePieceToStage,
  movePieceToSlot,
  markPiecesToBeShuffled,
  shufflePieces,
  getSlotPiece,
  getStagePieces,
  getPiecesToShuffle,
  isSolved,
  ID,
  IGameState,
} from './state'

export function useGameState(ids: ID[]) {
  const [state, setState] = useState<IGameState>(createState(ids))
  useEffect(() => {
    setState(createState(ids))
  }, [ids])

  return {
    isSolved: isSolved(state),
    stagePieces: getStagePieces(state),
    piecesToShuffle: getPiecesToShuffle(state),
    getSlotPiece: (slotId: ID) => getSlotPiece(state, slotId),
    movePieceToStage: (pieceId: ID, top: number, left: number) =>
      setState(state => movePieceToStage(state, pieceId, top, left)),
    movePieceToSlot: (pieceId: ID, slotId: ID) =>
      setState(state => movePieceToSlot(state, pieceId, slotId)),
    markPiecesToBeShuffled: (pieceIds: ID[]) =>
      setState(state => markPiecesToBeShuffled(state, pieceIds)),
    shufflePieces: (
      stage: Rect,
      obstacles: Rect[],
      pieceWidth: number,
      pieceHeight: number,
    ) =>
      setState(state =>
        shufflePieces(state, stage, obstacles, pieceWidth, pieceHeight),
      ),
    ...debug(state, ids),
  }
}

function debug(state: IGameState, ids: ID[]) {
  if (process.env.NODE_ENV !== 'production') {
    return {
      debug: () => console.log({ ids, state }),
    }
  }
}

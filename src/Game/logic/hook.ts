import { useState, useEffect } from 'react'

import { Rect } from './shuffling'

import {
  createState,
  movePieceToStage,
  movePieceToSlot,
  shufflePieces,
  getSlotPiece,
  getStagePieces,
  getPiecesToShuffle,
  isSolved,
  ID,
  IGameState,
} from './state'

export function useGameState(ids: Array<ID>) {
  const [state, setState] = useState<IGameState>(createState(ids))
  useEffect(() => {
    setState(createState(ids))
  }, [ids])

  return {
    isSolved: () => isSolved(state),
    getSlotPiece: (slotId: ID) => getSlotPiece(state, slotId),
    getStagePieces: () => getStagePieces(state),
    getPiecesToShuffle: () => getPiecesToShuffle(state),
    movePieceToStage: (pieceId: ID, top: number, left: number) =>
      setState(state => movePieceToStage(state, pieceId, top, left)),
    movePieceToSlot: (pieceId: ID, slotId: ID) =>
      setState(state => movePieceToSlot(state, pieceId, slotId)),
    shufflePieces: (stage: Rect) =>
      setState(state => shufflePieces(state, stage)),
    ...debug(state),
  }
}

function debug(state: IGameState) {
  if (process.env.NODE_ENV !== 'production') {
    return {
      debug: () => console.log(state),
    }
  }
}

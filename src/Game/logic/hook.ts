import { useState, useEffect } from 'react'

import {
  createState,
  movePieceToStage,
  movePieceToSlot,
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
    ...(process.env.NODE_ENV !== 'production' ? {
      debug: () => {
        console.log(state)
      },
    } : {}),
  }
}

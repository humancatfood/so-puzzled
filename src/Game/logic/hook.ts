import { useState, useEffect } from 'react'

import { createState, movePieceToStage, movePieceToSlot, getSlotPiece, getStagePieces, ID, IGameState } from './state'




export function useGameState(ids: Array<ID>) {
  const [state, setState] = useState<IGameState>(createState(ids))
  useEffect(() => {
    setState(createState(ids))
  }, [ids])

  return {
    getSlotPiece: (slotId: ID) => getSlotPiece(state, slotId),
    getStagePieces: () => getStagePieces(state),
    movePieceToStage: (pieceId: ID, top: number, left: number) => setState(state => {
      return movePieceToStage(state, pieceId, top, left)
    }),
    movePieceToSlot: (pieceId: ID, slotId: ID) => setState(state => {
      return movePieceToSlot(state, pieceId, slotId)
    }),
  }
}


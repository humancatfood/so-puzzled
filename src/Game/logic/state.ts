export type ID = string

export type PieceMap = Record<ID, IPiece | null>

export interface IPiece {
  id: ID
  left: number
  top: number
}

export interface IGameState {
  slots: PieceMap
  stage: Array<IPiece>
}

export function createState(ids: Array<ID>): IGameState {
  const slots = ids.reduce<PieceMap>(
    (acc, id) => ({
      ...acc,
      [id]: {
        id,
        top: 0,
        left: 0,
      },
    }),
    {},
  )
  return {
    slots,
    stage: [],
  }
}

export function movePieceToStage(
  state: IGameState,
  pieceId: ID,
  top: number,
  left: number,
): IGameState {
  const slots = Object.entries(state.slots).reduce<PieceMap>(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value?.id === pieceId ? null : value,
    }),
    {},
  )

  const stage = [
    ...state.stage.filter(piece => piece.id !== pieceId),
    {
      id: pieceId,
      top,
      left,
    },
  ]

  return { slots, stage }
}

export function movePieceToSlot(
  state: IGameState,
  pieceId: ID,
  slotId: ID,
): IGameState {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const currentOccupant = getSlotPiece(state, slotId)

  if (currentOccupant) {
    state = movePieceToStage(state, currentOccupant.id, 0, 0)
  }

  const slotsEntries = Object.entries(state.slots).map(
    ([slotKey, slotPiece]) => {
      if (slotPiece?.id === pieceId) {
        return [slotKey, null]
      } else if (slotKey === slotId) {
        return [slotKey, { id: pieceId, top: 0, left: 0 }]
      } else {
        return [slotKey, slotPiece]
      }
    },
  )

  return {
    slots: Object.fromEntries(slotsEntries),
    stage: state.stage.filter(piece => piece.id !== pieceId),
  }
}

export function getSlotPiece(state: IGameState, slotId: ID): IPiece | null {
  return state.slots[slotId] ?? null
}

export function getStagePieces(state: IGameState): Array<IPiece> {
  return state.stage
}

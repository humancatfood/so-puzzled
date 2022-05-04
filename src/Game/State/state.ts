import { shufflePiece, Rect } from './shuffling'

export type ID = string

export type PieceMap = Record<ID, IPiece | null>

export interface IPiece {
  id: ID
  left?: number
  top?: number
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
  top?: number,
  left?: number,
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
    state = markPiecesToBeShuffled(state, [currentOccupant.id])
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

export function markPiecesToBeShuffled(
  state: IGameState,
  ids: ID[],
): IGameState {
  for (const id of ids) {
    state = movePieceToStage(state, id)
  }
  return state
}

export function shufflePieces(
  state: IGameState,
  stage: Rect,
  obstacles?: Rect[],
  pieceWidth?: number,
  pieceHeight?: number,
): IGameState {
  return {
    ...state,
    stage: state.stage.map(piece => {
      if (piece.left == null || piece.top == null) {
        return {
          ...piece,
          ...shufflePiece({ stage, avoid: obstacles, pieceWidth, pieceHeight }),
        }
      } else {
        return piece
      }
    }),
  }
}

export function getSlotPiece(state: IGameState, slotId: ID): IPiece | null {
  return state.slots[slotId] ?? null
}

export function getStagePieces(state: IGameState): Array<IPiece> {
  return state.stage.filter(
    ({ left, top }) => left !== undefined && top !== undefined,
  )
}

export function getPiecesToShuffle(state: IGameState): Array<IPiece> {
  return state.stage.filter(
    ({ left, top }) => left === undefined && top === undefined,
  )
}

export function isSolved(state: IGameState): boolean {
  for (const [slotKey, content] of Object.entries(state.slots)) {
    if (!content || content.id !== slotKey) {
      return false
    }
  }
  return true
}

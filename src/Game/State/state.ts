import { shufflePiece, Rect } from './shuffling'

export type ID = string

export interface IPiece {
  id: ID
  x: number
  y: number
  left?: number
  top?: number
}

export interface IGameState {
  slots: Record<ID, ID>
  stage: Array<ID>
  pieces: Record<ID, IPiece>
}

export function createState(numRows: number, numCols: number): IGameState {
  const pieces: Record<ID, IPiece> = {}
  const slots: Record<ID, ID> = {}

  for (let y = 0; y < numRows; y += 1) {
    for (let x = 0; x < numCols; x += 1) {
      const id = `${x}-${y}`
      pieces[id] = {
        id,
        x,
        y,
        left: 0,
        top: 0,
      }
      slots[id] = id
    }
  }

  return {
    slots,
    stage: [],
    pieces,
  }
}

export function movePieceToStage(
  state: IGameState,
  pieceId: ID,
  top?: number,
  left?: number,
): IGameState {
  const slots = Object.entries(state.slots).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value === pieceId ? null : value,
    }),
    {},
  )

  const stage = state.stage.filter(id => id !== pieceId).concat(pieceId)

  const pieces = {
    ...state.pieces,
    [pieceId]: {
      ...state.pieces[pieceId],
      top,
      left,
    },
  }

  return { ...state, slots, stage, pieces }
}

export function movePieceToSlot(
  state: IGameState,
  pieceId: ID,
  targetSlotId: ID,
): IGameState {
  const currentOccupant = getSlotPiece(state, targetSlotId)

  if (currentOccupant) {
    state = markPiecesToBeShuffled(state, [currentOccupant.id])
  }

  const slotsEntries = Object.entries(state.slots).map(
    ([slotID, slotPieceID]) => {
      if (slotPieceID === pieceId) {
        return [slotID, null]
      } else if (slotID === targetSlotId) {
        return [slotID, pieceId]
      } else {
        return [slotID, slotPieceID]
      }
    },
  )

  const pieces = {
    ...state.pieces,
    [pieceId]: {
      ...state.pieces[pieceId],
      top: 0,
      left: 0,
    },
  }

  return {
    ...state,
    pieces,
    slots: Object.fromEntries(slotsEntries),
    stage: state.stage.filter(id => id !== pieceId),
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
  const pieces: Record<ID, IPiece> = {
    ...state.pieces,
    ...state.stage
      .map(id => state.pieces[id])
      .reduce((acc, piece) => {
        acc[piece.id] = {
          ...piece,
          ...shufflePiece({ stage, avoid: obstacles, pieceWidth, pieceHeight }),
        }
        return acc
      }, {} as Record<ID, IPiece>),
  }

  return {
    ...state,
    pieces,
  }
}

export function getSlotPiece(state: IGameState, slotId: ID): IPiece | null {
  const pieceId = state.slots[slotId]
  return pieceId ? state.pieces[pieceId] : null
}

export function getStagePieces(state: IGameState): Array<IPiece> {
  return state.stage
    .map(id => state.pieces[id])
    .filter(({ left, top }) => left !== undefined && top !== undefined)
}

export function getPiecesToShuffle(state: IGameState): Array<IPiece> {
  return state.stage
    .map(id => state.pieces[id])
    .filter(({ left, top }) => left === undefined && top === undefined)
}

export function isSolved(state: IGameState): boolean {
  for (const [slotId, pieceId] of Object.entries(state.slots)) {
    if (!pieceId || pieceId !== slotId) {
      return false
    }
  }
  return true
}

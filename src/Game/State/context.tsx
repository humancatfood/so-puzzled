import {
  useState,
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react'

import { Rect } from './shuffling'

import {
  createState,
  movePieceToStage,
  movePieceToSlot,
  markPiecesToBeShuffled,
  markAllPiecesToBeShuffled,
  shufflePieces,
  getSlotPiece,
  getStagePieces,
  getPiecesToShuffle,
  isSolved,
  ID,
  IGameState,
  IPiece,
} from './state'

type GameStateContext = {
  isSolved: boolean
  stagePieces: IPiece[]
  piecesToShuffle: IPiece[]
  getSlotPiece: (slotID: ID) => IPiece | null
  movePieceToStage: (pieceId: ID, top: number, left: number) => void
  movePieceToSlot: (pieceId: ID, slotId: ID) => void
  markPiecesToBeShuffled: (pieceIds: ID[]) => void
  markAllPiecesToBeShuffled: () => void
  reset: (numRows: number, numCols: number) => void
  shufflePieces: (
    stage: Rect,
    obstacles: Rect[],
    pieceWidth: number,
    pieceHeight: number,
  ) => void
  debug: () => void
}

const Context = createContext<GameStateContext | null>(null)

export function GameStateProvider(props: PropsWithChildren<unknown>) {
  const [state, setState] = useState<IGameState>({
    slots: {},
    stage: [],
    pieces: {},
  })

  const value = useMemo(
    () => ({
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
      markAllPiecesToBeShuffled: () =>
        setState(state => markAllPiecesToBeShuffled(state)),
      shufflePieces: (
        stage: Rect,
        obstacles: Rect[],
        pieceWidth: number,
        pieceHeight: number,
      ) =>
        setState(state =>
          shufflePieces(state, stage, obstacles, pieceWidth, pieceHeight),
        ),
      reset: (numRows: number, numCols: number) =>
        setState(createState(numRows, numCols)),
      debug: debug(state),
    }),
    [state],
  )
  return <Context.Provider value={value} {...props} />
}

export function useGameState(): GameStateContext {
  const instance = useContext<GameStateContext | null>(Context)
  if (!instance) {
    throw new Error('`useGameState` must be called within `GameStateProvider`')
  }
  return instance
}

function debug(state: IGameState) {
  return () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log({ state })
    }
  }
}

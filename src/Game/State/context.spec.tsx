import { act, renderHook } from '@testing-library/react-hooks'

import { useGameState, GameStateProvider } from './context'

function checkSlot(
  state: ReturnType<typeof useGameState>,
  slotId: string,
  expectedPieceId: string | null,
) {
  if (expectedPieceId) {
    expect(state.getSlotPiece(slotId)).toEqual(
      expect.objectContaining({ id: expectedPieceId }),
    )
  } else {
    expect(state.getSlotPiece(slotId)).toEqual(null)
  }
}

describe('Game Logic as hook', () => {
  it('lets you set up a new empty state', () => {
    const { result } = renderHook(useGameState, {
      wrapper: GameStateProvider,
    })
    checkSlot(result.current, '0-0', null)
    expect(result.current.stagePieces).toEqual([])
    expect(result.current.isSolved).toEqual(true)
  })

  it('puts pieces into their correct slot by default', () => {
    const { result } = renderHook(useGameState, {
      wrapper: GameStateProvider,
    })
    act(() => {
      result.current.reset(1, 3)
    })
    checkSlot(result.current, '0-0', '0-0')
    checkSlot(result.current, '1-0', '1-0')
    checkSlot(result.current, '2-0', '2-0')
    expect(result.current.stagePieces).toEqual([])
    expect(result.current.isSolved).toEqual(true)
  })

  it('stress-testing', () => {
    const { result } = renderHook(useGameState, {
      wrapper: GameStateProvider,
    })

    act(() => {
      result.current.reset(1, 3)
      result.current.movePieceToStage('0-0', 10, 20)
      result.current.movePieceToSlot('0-0', '0-0')
      result.current.movePieceToStage('0-0', 20, 30)
      result.current.movePieceToSlot('0-0', '0-0')
    })

    checkSlot(result.current, '0-0', '0-0')
    checkSlot(result.current, '1-0', '1-0')
    checkSlot(result.current, '2-0', '2-0')
    expect(result.current.stagePieces).toEqual([])
    act(() => {
      result.current.movePieceToSlot('0-0', '2-0')
      result.current.movePieceToSlot('1-0', '0-0')
      result.current.movePieceToSlot('0-0', '1-0')
    })

    checkSlot(result.current, '0-0', '1-0')
    checkSlot(result.current, '1-0', '0-0')
    checkSlot(result.current, '2-0', null)
    expect(result.current.stagePieces).toEqual([])
    expect(result.current.piecesToShuffle).toEqual([
      expect.objectContaining({ id: '2-0' }),
    ])
    expect(result.current.isSolved).toEqual(false)

    act(() => {
      result.current.movePieceToSlot('0-0', '0-0')
      result.current.movePieceToSlot('1-0', '1-0')
      result.current.movePieceToSlot('2-0', '2-0')
    })

    checkSlot(result.current, '0-0', '0-0')
    checkSlot(result.current, '1-0', '1-0')
    checkSlot(result.current, '2-0', '2-0')
    expect(result.current.stagePieces).toEqual([])
    expect(result.current.isSolved).toEqual(true)
  })
})

import { act, renderHook } from '@testing-library/react-hooks'

import { useGameState } from './hook'

function checkSlot(state: ReturnType<typeof useGameState>, slotId: string, expectedPieceId: string|null) {
  if (expectedPieceId) {
    expect(state.getSlotPiece(slotId)).toEqual(expect.objectContaining({ id: expectedPieceId }))
  } else {
    expect(state.getSlotPiece(slotId)).toEqual(null)
  }
}

describe('Game Logic as hook', () => {
  it('lets you set up a new empty state', () => {
    const { result } = renderHook(useGameState, {
      initialProps: [],
    })
    checkSlot(result.current, '1', null)
    expect(result.current.getStagePieces()).toEqual([])
    expect(result.current.isSolved()).toEqual(true)
  })

  it('puts pieces into their correct slot by default', () => {
    const { result } = renderHook(useGameState, {
      initialProps: ['1', '2', '3'],
    })
    checkSlot(result.current, '1', '1')
    checkSlot(result.current, '2', '2')
    checkSlot(result.current, '3', '3')
    expect(result.current.getStagePieces()).toEqual([])
    expect(result.current.isSolved()).toEqual(true)
  })

  it('stress-testing', () => {
    const { result } = renderHook(useGameState, {
      initialProps: ['1', '2', '3'],
    })

    act(() => {
      result.current.movePieceToStage('1', 10, 20)
      result.current.movePieceToSlot('1', '1')
      result.current.movePieceToStage('1', 20, 30)
      result.current.movePieceToSlot('1', '1')
    })

    checkSlot(result.current, '1', '1')
    checkSlot(result.current, '2', '2')
    checkSlot(result.current, '3', '3')
    expect(result.current.getStagePieces()).toEqual([])
    act(() => {
      result.current.movePieceToSlot('1', '3')
      result.current.movePieceToSlot('2', '1')
      result.current.movePieceToSlot('1', '2')
    })

    checkSlot(result.current, '1', '2')
    checkSlot(result.current, '2', '1')
    checkSlot(result.current, '3', null)
    expect(result.current.getStagePieces()).toEqual([])
    expect(result.current.getPiecesToShuffle()).toEqual([
      expect.objectContaining({ id: '3' }),
    ])
    expect(result.current.isSolved()).toEqual(false)
    
    act(() => {
      result.current.movePieceToSlot('1', '1')
      result.current.movePieceToSlot('2', '2')
      result.current.movePieceToSlot('3', '3')
    })

    checkSlot(result.current, '1', '1')
    checkSlot(result.current, '2', '2')
    checkSlot(result.current, '3', '3')
    expect(result.current.getStagePieces()).toEqual([])
    expect(result.current.isSolved()).toEqual(true)
  })
})

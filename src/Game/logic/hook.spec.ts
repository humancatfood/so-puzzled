import { act, renderHook } from '@testing-library/react-hooks'

import { useGameState } from './hook'

describe('Game Logic as hook', () => {
  it('lets you set up a new empty state', () => {
    const { result } = renderHook(useGameState, {
      initialProps: [],
    })

    expect(result.current.getSlotPiece('1')).toEqual(null)
    expect(result.current.getStagePieces()).toEqual([])
  })

  it('puts pieces into their correct slot by default', () => {
    const { result } = renderHook(useGameState, {
      initialProps: ['1', '2', '3'],
    })
    expect(result.current.getSlotPiece('1')).toEqual({
      id: '1',
      top: 0,
      left: 0,
    })
    expect(result.current.getSlotPiece('2')).toEqual({
      id: '2',
      top: 0,
      left: 0,
    })
    expect(result.current.getSlotPiece('3')).toEqual({
      id: '3',
      top: 0,
      left: 0,
    })
    expect(result.current.getStagePieces()).toEqual([])
  })

  it('slot -> stage', () => {
    const { result } = renderHook(useGameState, {
      initialProps: ['1', '2', '3'],
    })

    act(() => {
      result.current.movePieceToStage('1', 0, 0)
    })

    expect(result.current.getSlotPiece('1')).toEqual(null)
    expect(result.current.getSlotPiece('2')).toEqual({
      id: '2',
      top: 0,
      left: 0,
    })
    expect(result.current.getSlotPiece('3')).toEqual({
      id: '3',
      top: 0,
      left: 0,
    })
    expect(result.current.getStagePieces()).toEqual([
      { id: '1', top: 0, left: 0 },
    ])

    act(() => {
      result.current.movePieceToStage('2', 100, 123)
    })

    expect(result.current.getSlotPiece('1')).toEqual(null)
    expect(result.current.getSlotPiece('2')).toEqual(null)
    expect(result.current.getSlotPiece('3')).toEqual({
      id: '3',
      top: 0,
      left: 0,
    })
    expect(result.current.getStagePieces()).toEqual([
      { id: '1', top: 0, left: 0 },
      { id: '2', top: 100, left: 123 },
    ])
  })

  it('stage -> slot', () => {
    const { result } = renderHook(useGameState, {
      initialProps: ['1', '2', '3'],
    })

    act(() => {
      result.current.movePieceToStage('1', 123, 456)
      result.current.movePieceToStage('2', 777, 888)
      result.current.movePieceToSlot('1', '2')
    })

    expect(result.current.getSlotPiece('1')).toEqual(null)
    expect(result.current.getSlotPiece('2')).toEqual({
      id: '1',
      top: 0,
      left: 0,
    })
    expect(result.current.getSlotPiece('3')).toEqual({
      id: '3',
      top: 0,
      left: 0,
    })
    expect(result.current.getStagePieces()).toEqual([
      { id: '2', top: 777, left: 888 },
    ])
  })

  it('slot -> slot', () => {
    const { result } = renderHook(useGameState, {
      initialProps: ['1', '2', '3'],
    })

    act(() => {
      result.current.movePieceToSlot('1', '2')
    })

    expect(result.current.getSlotPiece('1')).toEqual(null)
    expect(result.current.getSlotPiece('2')).toEqual({
      id: '1',
      top: 0,
      left: 0,
    })
    expect(result.current.getSlotPiece('3')).toEqual({
      id: '3',
      top: 0,
      left: 0,
    })
    expect(result.current.getStagePieces()).toEqual([])

    act(() => {
      result.current.movePieceToSlot('1', '2')
    })

    expect(result.current.getSlotPiece('1')).toEqual(null)
    expect(result.current.getSlotPiece('2')).toEqual({
      id: '1',
      top: 0,
      left: 0,
    })
    expect(result.current.getSlotPiece('3')).toEqual({
      id: '3',
      top: 0,
      left: 0,
    })
    expect(result.current.getStagePieces()).toEqual([])
  })

  it('stage -> stage', () => {
    const { result } = renderHook(useGameState, {
      initialProps: ['1', '2', '3'],
    })

    act(() => {
      result.current.movePieceToStage('1', 987, 654)
      result.current.movePieceToStage('1', 123, 456)
    })

    expect(result.current.getSlotPiece('1')).toEqual(null)
    expect(result.current.getSlotPiece('2')).toEqual({
      id: '2',
      top: 0,
      left: 0,
    })
    expect(result.current.getSlotPiece('3')).toEqual({
      id: '3',
      top: 0,
      left: 0,
    })
    expect(result.current.getStagePieces()).toEqual([
      { id: '1', top: 123, left: 456 },
    ])
  })

  describe('bugs', () => {
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

      expect(result.current.getSlotPiece('1')).toEqual({
        id: '1',
        top: 0,
        left: 0,
      })
      expect(result.current.getSlotPiece('2')).toEqual({
        id: '2',
        top: 0,
        left: 0,
      })
      expect(result.current.getSlotPiece('3')).toEqual({
        id: '3',
        top: 0,
        left: 0,
      })
      expect(result.current.getStagePieces()).toEqual([])

      act(() => {
        result.current.movePieceToSlot('1', '3')
        result.current.movePieceToSlot('2', '1')
        result.current.movePieceToSlot('1', '2')
      })

      expect(result.current.getSlotPiece('1')).toEqual({
        id: '2',
        top: 0,
        left: 0,
      })
      expect(result.current.getSlotPiece('2')).toEqual({
        id: '1',
        top: 0,
        left: 0,
      })
      expect(result.current.getSlotPiece('3')).toEqual(null)
      expect(result.current.getStagePieces()).toEqual([])
    })
  })
})

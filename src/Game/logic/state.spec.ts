import {
  createState,
  movePieceToStage,
  movePieceToSlot,
  IGameState,
  getSlotPiece,
  getStagePieces,
  isSolved,
} from './state'

function assertImmutability(a: IGameState, b: IGameState) {
  expect(b).not.toBe(a)
  expect(b.slots).not.toBe(a.slots)
  expect(b.stage).not.toBe(a.stage)
}

describe('Game State', () => {
  describe('initialization', () => {
    it('lets you set up a new empty state', () => {
      const state = createState([])
      expect(getSlotPiece(state, '1')).toEqual(null)
      expect(getStagePieces(state)).toEqual([])
      expect(isSolved(state)).toBe(true)
    })

    it('puts pieces into their correct slot by default', () => {
      const state = createState(['1', '2', '3'])
      expect(getSlotPiece(state, '1')).toEqual({ id: '1', top: 0, left: 0 })
      expect(getSlotPiece(state, '2')).toEqual({ id: '2', top: 0, left: 0 })
      expect(getSlotPiece(state, '3')).toEqual({ id: '3', top: 0, left: 0 })
      expect(getStagePieces(state)).toEqual([])
      expect(isSolved(state)).toBe(true)
    })
  })

  describe('moving pieces around', () => {
    it('slot -> stage', () => {
      const state1 = createState(['1', '2', '3'])

      const state2 = movePieceToStage(state1, '1', 0, 0)
      assertImmutability(state2, state1)

      expect(getSlotPiece(state2, '1')).toEqual(null)
      expect(getSlotPiece(state2, '2')).toEqual({ id: '2', top: 0, left: 0 })
      expect(getSlotPiece(state2, '3')).toEqual({ id: '3', top: 0, left: 0 })
      expect(getStagePieces(state2)).toEqual([{ id: '1', top: 0, left: 0 }])

      const state3 = movePieceToStage(state2, '2', 100, 123)
      assertImmutability(state3, state2)

      expect(getSlotPiece(state3, '1')).toEqual(null)
      expect(getSlotPiece(state3, '2')).toEqual(null)
      expect(getSlotPiece(state3, '3')).toEqual({ id: '3', top: 0, left: 0 })
      expect(getStagePieces(state3)).toEqual([
        { id: '1', top: 0, left: 0 },
        { id: '2', top: 100, left: 123 },
      ])
    })

    it('stage -> empty slot', () => {
      const state1 = createState(['1', '2', '3'])

      const state2 = movePieceToStage(state1, '1', 123, 456)
      const state3 = movePieceToStage(state2, '2', 777, 888)
      const state4 = movePieceToSlot(state3, '1', '2')
      assertImmutability(state3, state2)
      assertImmutability(state4, state3)

      expect(getSlotPiece(state4, '1')).toEqual(null)
      expect(getSlotPiece(state4, '2')).toEqual({ id: '1', top: 0, left: 0 })
      expect(getSlotPiece(state4, '3')).toEqual({ id: '3', top: 0, left: 0 })
      expect(getStagePieces(state4)).toEqual([{ id: '2', top: 777, left: 888 }])
    })

    it('slot -> empty slot', () => {
      const state1 = createState(['1', '2', '3'])
      const state2 = movePieceToStage(state1, '2', 123, 456)

      const state3 = movePieceToSlot(state2, '1', '2')
      assertImmutability(state3, state2)

      expect(getSlotPiece(state3, '1')).toEqual(null)
      expect(getSlotPiece(state3, '2')).toEqual({ id: '1', top: 0, left: 0 })
      expect(getSlotPiece(state3, '3')).toEqual({ id: '3', top: 0, left: 0 })
      expect(getStagePieces(state3)).toEqual([{ id: '2', top: 123, left: 456 }])

      const state4 = movePieceToSlot(state3, '1', '1')
      assertImmutability(state4, state3)

      expect(getSlotPiece(state4, '1')).toEqual({ id: '1', top: 0, left: 0 })
      expect(getSlotPiece(state4, '2')).toEqual(null)
      expect(getSlotPiece(state4, '3')).toEqual({ id: '3', top: 0, left: 0 })
      expect(getStagePieces(state4)).toEqual([{ id: '2', top: 123, left: 456 }])
    })

    it('stage -> stage', () => {
      const state1 = createState(['1', '2', '3'])

      const state2 = movePieceToStage(state1, '1', 987, 654)
      const state3 = movePieceToStage(state2, '1', 123, 456)
      assertImmutability(state2, state1)
      assertImmutability(state3, state2)

      expect(getSlotPiece(state3, '1')).toEqual(null)
      expect(getSlotPiece(state3, '2')).toEqual({ id: '2', top: 0, left: 0 })
      expect(getSlotPiece(state3, '3')).toEqual({ id: '3', top: 0, left: 0 })
      expect(getStagePieces(state3)).toEqual([{ id: '1', top: 123, left: 456 }])
    })
  })

  describe('winning condition', () => {
    let state: IGameState
    it('considers a state to be solved by default', () => {

      state = createState([])
      expect(isSolved(state)).toBe(true)
      
      state = createState(['1', '2', '3' ])
      expect(isSolved(state)).toBe(true)
    })

    it('considers a state not to be solved if a piece is missing', () => {
      state = createState(['1', '2', '3'])
      state = movePieceToStage(state, '1', 0, 0)
      expect(isSolved(state)).toBe(false)
    })

    it('considers a state not to be solved if a piece is in the wrong slot', () => {
      state = createState(['1', '2', '3'])
      state = movePieceToStage(state, '1', 0, 0)
      state = movePieceToSlot(state, '2', '1')
      state = movePieceToSlot(state, '1', '2')
      expect(isSolved(state)).toBe(false)
    })
  })

  describe('conflict resolution', () => {
    it('slot -> slot', () => {
      const state1 = createState(['1', '2', '3'])
      const state2 = movePieceToSlot(state1, '2', '1')

      assertImmutability(state1, state2)

      expect(getSlotPiece(state2, '1')).toEqual({ id: '2', top: 0, left: 0 })
      expect(getSlotPiece(state2, '2')).toEqual(null)
      expect(getSlotPiece(state2, '3')).toEqual({ id: '3', top: 0, left: 0 })

      expect(getStagePieces(state2)).toEqual([
        expect.objectContaining({ id: '1' }),
      ])
    })
  })
})

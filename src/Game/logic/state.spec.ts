import {
  createState,
  markPiecesToBeShuffled,
  movePieceToStage,
  movePieceToSlot,
  IGameState,
  getSlotPiece,
  getStagePieces,
  getPiecesToShuffle,
  shufflePieces,
  isSolved,
} from './state'

function assertImmutability(a: IGameState, b: IGameState) {
  expect(b).not.toBe(a)
  expect(b.slots).not.toBe(a.slots)
  expect(b.stage).not.toBe(a.stage)
}

describe('Game State', () => {
  let state: IGameState

  describe('initialization', () => {
    it('lets you set up a new empty state', () => {
      state = createState([])
      expect(getSlotPiece(state, '1')).toEqual(null)
      expect(getStagePieces(state)).toEqual([])
      expect(getPiecesToShuffle(state)).toEqual([])
      expect(isSolved(state)).toBe(true)
    })

    it('puts pieces into their correct slot by default', () => {
      state = createState(['1', '2', '3'])
      expect(getSlotPiece(state, '1')).toEqual({ id: '1', top: 0, left: 0 })
      expect(getSlotPiece(state, '2')).toEqual({ id: '2', top: 0, left: 0 })
      expect(getSlotPiece(state, '3')).toEqual({ id: '3', top: 0, left: 0 })
      expect(getStagePieces(state)).toEqual([])
      expect(getPiecesToShuffle(state)).toEqual([])
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
    it('considers a state to be solved by default', () => {
      state = createState([])
      expect(isSolved(state)).toBe(true)

      state = createState(['1', '2', '3'])
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

      expect(getStagePieces(state2)).toEqual([])
      expect(getPiecesToShuffle(state2)).toEqual([
        expect.objectContaining({ id: '1' }),
      ])
    })

    it('stage -> slot', () => {
      state = createState(['1', '2', '3'])
      state = movePieceToStage(state, '2')
      state = movePieceToSlot(state, '2', '3')

      expect(getSlotPiece(state, '1')).toEqual({ id: '1', top: 0, left: 0 })
      expect(getSlotPiece(state, '2')).toEqual(null)
      expect(getSlotPiece(state, '3')).toEqual({ id: '2', top: 0, left: 0 })

      expect(getStagePieces(state)).toEqual([])
      expect(getPiecesToShuffle(state)).toEqual([
        expect.objectContaining({ id: '3' }),
      ])
    })
  })

  describe.only('shuffling', () => {
    it("doesn't do anything if there's nothing to shuffle", () => {
      const state1 = createState(['1', '2', '3'])
      const state2 = shufflePieces(state1, {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      })

      expect(getSlotPiece(state2, '1')).toEqual({ id: '1', top: 0, left: 0 })
      expect(getSlotPiece(state2, '2')).toEqual({ id: '2', top: 0, left: 0 })
      expect(getSlotPiece(state2, '3')).toEqual({ id: '3', top: 0, left: 0 })
      expect(getStagePieces(state2)).toEqual([])
      expect(getPiecesToShuffle(state2)).toEqual([])
    })

    it('shuffles pieces', () => {
      state = createState(['1', '2', '3'])
      state = movePieceToSlot(state, '1', '2')
      state = movePieceToSlot(state, '1', '3')

      expect(getSlotPiece(state, '1')).toEqual(null)
      expect(getSlotPiece(state, '2')).toEqual(null)
      expect(getSlotPiece(state, '3')).toEqual(
        expect.objectContaining({ id: '1' }),
      )
      expect(getStagePieces(state)).toEqual([])
      expect(getPiecesToShuffle(state)).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: '2' }),
          expect.objectContaining({ id: '3' }),
        ]),
      )

      const state2 = shufflePieces(state, {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      })
      expect(getPiecesToShuffle(state2)).toEqual([])
      expect(getSlotPiece(state2, '1')).toEqual(null)
      expect(getSlotPiece(state2, '2')).toEqual(null)
      expect(getSlotPiece(state2, '3')).toEqual(
        expect.objectContaining({ id: '1' }),
      )
      expect(getStagePieces(state2)).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: '3',
            left: expect.any(Number),
            top: expect.any(Number),
          }),
          expect.objectContaining({
            id: '2',
            left: expect.any(Number),
            top: expect.any(Number),
          }),
        ]),
      )
    })

    it("let's you mark a piece to be shuffled", () => {
      state = createState(['1', '2', '3'])
      state = markPiecesToBeShuffled(state, ['1'])

      expect(getSlotPiece(state, '1')).toEqual(null)
      expect(getSlotPiece(state, '2')).toEqual({ id: '2', top: 0, left: 0 })
      expect(getSlotPiece(state, '3')).toEqual({ id: '3', top: 0, left: 0 })
      expect(getStagePieces(state)).toEqual([])
      expect(getPiecesToShuffle(state)).toEqual([
        expect.objectContaining({ id: '1' }),
      ])
    })
  })
})

import { createState, movePieceToStage, movePieceToSlot, IGameState, getSlotPiece, getStagePieces } from './logic'


function assertImmutability(a: IGameState, b: IGameState) {
  expect(b).not.toBe(a)
  expect(b.slots).not.toBe(a.slots)
  expect(b.stage).not.toBe(a.stage)

}

describe('Game Logic', () => {

  describe('functions', () => {

    it('lets you set up a new empty state', () => {
      const state = createState([])
      expect(getSlotPiece(state, '1')).toEqual(null)
      expect(getStagePieces(state)).toEqual([])
    })


    it('puts pieces into their correct slot by default', () => {
      const state = createState(['1', '2', '3'])
      expect(getSlotPiece(state, '1')).toEqual({ id: '1', left: 0, top: 0 })
      expect(getSlotPiece(state, '2')).toEqual({ id: '2', left: 0, top: 0 })
      expect(getSlotPiece(state, '3')).toEqual({ id: '3', left: 0, top: 0 })
      expect(getStagePieces(state)).toEqual([])
    })


    it('slot -> stage', () => {
      const state1 = createState(['1', '2', '3'])

      const state2 = movePieceToStage(state1, '1', 0, 0)
      assertImmutability(state2, state1)

      expect(getSlotPiece(state2, '1')).toEqual(null)
      expect(getSlotPiece(state2, '2')).toEqual({ id: '2', left: 0, top: 0 })
      expect(getSlotPiece(state2, '3')).toEqual({ id: '3', left: 0, top: 0 })
      expect(getStagePieces(state2)).toEqual([
        { id: '1', left: 0, top: 0 },
      ])

      const state3 = movePieceToStage(state2, '2', 100, 123)
      assertImmutability(state3, state2)

      expect(getSlotPiece(state3, '1')).toEqual(null)
      expect(getSlotPiece(state3, '2')).toEqual(null)
      expect(getSlotPiece(state3, '3')).toEqual({ id: '3', left: 0, top: 0 })
      expect(getStagePieces(state3)).toEqual([
        { id: '1', top: 0, left: 0 },
        { id: '2', top: 100, left: 123 },
      ])
    })


    it('stage -> slot', () => {
      const state1 = createState(['1', '2', '3'])

      const state2 = movePieceToStage(state1, '1', 123, 456)
      const state3 = movePieceToStage(state2, '2', 777, 888)
      const state4 = movePieceToSlot(state3, '1', '2')
      assertImmutability(state4, state3)

      expect(getSlotPiece(state4, '1')).toEqual(null)
      expect(getSlotPiece(state4, '2')).toEqual({ id: '1', left: 0, top: 0 })
      expect(getSlotPiece(state4, '3')).toEqual({ id: '3', left: 0, top: 0 })
      expect(getStagePieces(state4)).toEqual([
        { id: '2', top: 777, left: 888 },
      ])

    })


    it('slot -> slot', () => {
      const state1 = createState(['1', '2', '3'])

      const state2 = movePieceToSlot(state1, '1', '2')
      assertImmutability(state2, state1)

      expect(getSlotPiece(state2, '1')).toEqual(null)
      expect(getSlotPiece(state2, '2')).toEqual({ id: '1', left: 0, top: 0 })
      expect(getSlotPiece(state2, '3')).toEqual({ id: '3', left: 0, top: 0 })
      expect(getStagePieces(state2)).toEqual([])

      const state3 = movePieceToSlot(state2, '1', '2')
      assertImmutability(state3, state2)

      expect(getSlotPiece(state2, '1')).toEqual(null)
      expect(getSlotPiece(state2, '2')).toEqual({ id: '1', left: 0, top: 0 })
      expect(getSlotPiece(state2, '3')).toEqual({ id: '3', left: 0, top: 0 })
      expect(getStagePieces(state2)).toEqual([])

    })


    it('stage -> stage', () => {
      const state1 = createState(['1', '2', '3'])

      const state2 = movePieceToStage(state1, '1', 987, 654)
      const state3 = movePieceToStage(state2, '1', 123, 456)
      assertImmutability(state2, state1)
      assertImmutability(state3, state2)

      expect(getSlotPiece(state3, '1')).toEqual(null)
      expect(getSlotPiece(state3, '2')).toEqual({ id: '2', left: 0, top: 0 })
      expect(getSlotPiece(state3, '3')).toEqual({ id: '3', left: 0, top: 0 })
      expect(getStagePieces(state3)).toEqual([
        { id: '1', top: 123, left: 456 },
      ])
    })

  })

})

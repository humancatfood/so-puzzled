import { createState, movePieceToStage, movePieceToSlot, GameState } from './logic'


function assertImmutability(a:GameState, b:GameState) {
  expect(b).not.toBe(a)
  expect(b.slots).not.toBe(a.slots)
  expect(b.stage).not.toBe(a.stage)

}

describe('Game Logic', () => {

  it('lets you set up a new empty state', () => {
    const { slots, stage } = createState([])
    expect(stage).toEqual([])
    expect(slots).toEqual({})
  })

  it('puts pieces into their correct slot by default', () => {
    const { slots, stage } = createState(['1', '2', '3'])
    expect(stage).toEqual([])
    expect(slots).toEqual({
      1: '1',
      2: '2',
      3: '3',
    })
  })

  it('lets you move a piece from its slot to the stage', () => {
    const state1 = createState(['1', '2', '3'])

    const state2 = movePieceToStage(state1, '1', 0, 0)
    assertImmutability(state2, state1)

    expect(state2.slots).toEqual({
      2: '2',
      3: '3',
    })
    expect(state2.stage).toEqual([{
      id: '1', top: 0, left: 0,
    }])

    const state3 = movePieceToStage(state2, '2', 100, 123)
    assertImmutability(state3, state2)

    expect(state3.slots).toEqual({
      3: '3',
    })
    expect(state3.stage).toEqual([{
      id: '1', top: 0, left: 0,
    }, {
      id: '2',top: 100,left: 123,
    }])
  })


  it('lets you move a piece from the stage to a slot', () => {
    const state1 = createState(['1', '2', '3'])

    const state2 = movePieceToStage(state1, '1', 123, 456)
    const state3 = movePieceToStage(state2, '2', 777, 888)

    const state4 = movePieceToSlot(state3, '1', '2')

    assertImmutability(state4,state3)

    expect(state4.slots).toEqual({
      2: '1',
      3: '3',
    })
    expect(state4.stage).toEqual([
      { id: '2', top: 777, left: 888 },
    ])

  })

  it('lets you move a piece from the stage to the stage', () => {
    const state1 = createState(['1', '2', '3'])

    const state2 = movePieceToStage(state1, '1', 987, 654)
    const state3 = movePieceToStage(state2, '1', 123, 456)
    assertImmutability(state1,state2)
    assertImmutability(state3,state2)

    expect(state3.slots).toEqual({
      2: '2',
      3: '3',
    })
    expect(state3.stage).toEqual([{
      id: '1', top: 123, left: 456,
    }])
  })


})

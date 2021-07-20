import { getIds, coordsToId } from './ids'

describe('Ids', () => {
  it('gets ids', () => {
    expect(getIds(0, 0)).toEqual([])
    expect(getIds(2, 0)).toEqual([])
    expect(getIds(0, 4)).toEqual([])

    expect(getIds(1, 1)).toEqual([coordsToId(0, 0)])

    expect(getIds(1, 2)).toEqual([coordsToId(0, 0), coordsToId(1, 0)])

    expect(getIds(2, 1)).toEqual([coordsToId(0, 0), coordsToId(0, 1)])

    expect(getIds(2, 2)).toEqual([
      coordsToId(0, 0),
      coordsToId(1, 0),
      coordsToId(0, 1),
      coordsToId(1, 1),
    ])
  })
})

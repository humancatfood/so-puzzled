import { shufflePiece } from './shuffling'

const stages: Parameters<typeof shufflePiece>[0][] = [
  {
    top: 4,
    bottom: 11,
    left: 7,
    right: 10,
  },
  {
    top: -1000,
    bottom: -1,
    left: -100,
    right: 1000,
  },
]

describe('Shuffling', () => {
  describe.each(stages)('stage: %j', stage => {
    describe('basic', () => {
      it('shuffles', () => {
        expect(shufflePiece(stage)).toEqual(
          expect.objectContaining({
            left: expect.any(Number),
            top: expect.any(Number),
          }),
        )
      })

      it("doesn't repeat itself .. EVER!!!!", () => {
        const locations = new Array(100)
          .fill(undefined)
          .map(() => shufflePiece(stage))

        const lefts = new Set(locations.map(location => location.left))
        const tops = new Set(locations.map(location => location.top))

        expect(lefts.size).toEqual(locations.length)
        expect(tops.size).toEqual(locations.length)
      })

      it('stays within limits .. ALWAYS!!!!', () => {
        const locations = new Array(300)
          .fill(undefined)
          .map(() => shufflePiece(stage))

        const lefts = locations.map(location => location.left)
        const tops = locations.map(location => location.top)

        expect(Math.min(...lefts)).toBeGreaterThanOrEqual(stage.left)
        expect(Math.max(...lefts)).toBeLessThanOrEqual(stage.right)
        expect(Math.min(...tops)).toBeGreaterThanOrEqual(stage.top)
        expect(Math.max(...tops)).toBeLessThanOrEqual(stage.bottom)
      })
    })

    describe('obstacle avoidance', () => {
      it('shuffles around things', () => {
        const obstacle = { top: -100, bottom: 3, left: -20, right: 8 }
        const locations = new Array(500)
          .fill(undefined)
          .map(() => shufflePiece(stage, [obstacle]))
        const locationsInObstacle = locations.filter(
          ({ left, top }) =>
            left <= obstacle.right &&
            left >= obstacle.left &&
            top >= obstacle.top &&
            top <= obstacle.bottom,
        )
        expect(locationsInObstacle).toEqual([])
      })
    })
  })
})


import { getGridDimensions } from './grid'


describe('Grid Calculations', () => {
  it('calculates grid-dimension', () => {
    expect(getGridDimensions(100, 50, 2)).toEqual({ numRows: 2, numCols: 4 })
    expect(getGridDimensions(200, 100, 2)).toEqual({ numRows: 2, numCols: 4 })
    expect(getGridDimensions(100, 100, 2)).toEqual({ numRows: 2, numCols: 2 })
    expect(getGridDimensions(100, 150, 2)).toEqual({ numRows: 3, numCols: 2 })
    expect(getGridDimensions(100, 75, 2)).toEqual({ numRows: 2, numCols: 3 })
  })
})

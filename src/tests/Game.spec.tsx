import '@testing-library/jest-dom'
import {
  render,
  prettyDOM,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import Game from '../Game'

describe('Game', () => {
  it('renders', async () => {
    const { container, getByText, queryByText, findByTestId } = render(
      <Game imgSrc="800x500.jpg" difficulty={5} />,
    )

    const match = (snapshotName: string) => {
      expect(
        prettyDOM(container, 999999, { highlight: false }),
      ).toMatchSnapshot(snapshotName)
    }

    expect(getByText('loading')).toBeInTheDocument()
    match('loading')

    await waitForElementToBeRemoved(() => queryByText('loading'))

    await findByTestId('piece-0-0')
    match('after placing pieces')
  })
})

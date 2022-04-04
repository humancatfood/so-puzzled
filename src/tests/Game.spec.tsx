import '@testing-library/jest-dom'
import {
  render,
  prettyDOM,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import Game from '../Game'

describe('Game', () => {
  it('renders', async () => {
    const { container, getByText, queryByText, findByTestId, debug } = render(
      <Game imgSrc="800x500.jpg" difficulty={5} />,
    )

    const match = () => {
      expect(
        prettyDOM(container, 999999, { highlight: false }),
      ).toMatchSnapshot()
    }

    expect(getByText('loading')).toBeInTheDocument()
    match()

    await waitForElementToBeRemoved(() => queryByText('loading'))
    match()

    await findByTestId('piece-0-0')
    match()
  })
})

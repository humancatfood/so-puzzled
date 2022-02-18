import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useImageLoader } from '../utils'

import { Game } from './Game'

export type GameWrapperProps = {
  Game: typeof Game
  imgSrc: string
  difficulty: number
}

export function GameWrapper({ Game, imgSrc, difficulty }: GameWrapperProps) {
  const { error, img, isLoading } = useImageLoader(imgSrc)

  if (error) {
    return (
      <>
        <h1>Error:</h1>
        <h2>{error}</h2>
      </>
    )
  }

  console.log({ img })

  if (img) {
    return (
      <DndProvider backend={HTML5Backend}>
        <Game difficulty={difficulty} img={img} />
      </DndProvider>
    )
  }

  if (isLoading) {
    return <h1>loading</h1>
  }

  return null
}

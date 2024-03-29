import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

import { isMobile, useImageLoader } from '../utils'
import { ConfigProvider } from './Config'
import { Game } from './Game'
import { GameStateProvider } from './State'

export type GameWrapperProps = {
  imgSrc: string
  difficulty: number
}

export function GameWrapper({ imgSrc, difficulty }: GameWrapperProps) {
  const { error, img, isLoading } = useImageLoader(imgSrc)

  if (error) {
    return (
      <>
        <h1>Error:</h1>
        <h2>{error}</h2>
      </>
    )
  }

  if (isLoading) {
    return <h1>loading</h1>
  }

  if (img) {
    return (
      <DndProvider backend={isMobile() ? TouchBackend : HTML5Backend}>
        <ConfigProvider difficulty={difficulty} img={img}>
          <GameStateProvider>
            <Game />
          </GameStateProvider>
        </ConfigProvider>
      </DndProvider>
    )
  }

  return null
}

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useImageLoader } from '../utils'
import { ConfigProvider } from './Config'
import { Game } from './Game'

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
      <DndProvider backend={HTML5Backend}>
        <ConfigProvider difficulty={difficulty} img={img}>
          <Game img={img} />
        </ConfigProvider>
      </DndProvider>
    )
  }

  return null
}

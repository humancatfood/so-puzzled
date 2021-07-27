import { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Game from './Game'

export type GameWrapperProps = {
  Game: typeof Game
  imgSrc: string
  difficulty: number
}

export default function GameWrapper({
  Game,
  imgSrc,
  difficulty,
}: GameWrapperProps) {
  const [img, setImg] = useState<HTMLImageElement>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    const img = new Image()
    img.addEventListener('load', () => setImg(img))
    img.addEventListener('error', error => setError(error.message))
    img.src = imgSrc
  }, [imgSrc])

  if (error) {
    return <h1>{error}</h1>
  }

  if (img) {
    return (
      <DndProvider backend={HTML5Backend}>
        <Game difficulty={difficulty} img={img} />
      </DndProvider>
    )
  }

  return <h1>loading</h1>
}

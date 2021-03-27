import {useCallback, useRef, useState} from'react'
import GameLogic from './logic'
import { useElementSize } from "./utils"

import Menu from './Menu'
import GameGrid from './Grid'



type GameProps = {
  img: string
}

// The game state where the actual fun happens.
export default function Game({img}: GameProps) {

  const [showHelp, setShowHelp] = useState<boolean>(false)
  const [isStarted, setStarted] = useState<boolean>(false)
  const [showGrid, setShowGrid] = useState<boolean>(false)

  const imgRef = useRef<HTMLImageElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  const [imgWidth, imgHeight] = useElementSize(imgRef.current)
  // const [stageWidth, stageHeight] = useElementSize(stageRef.current)

  const onLoadImage = () => setTimeout (function () {
    // .. then we tell the component to show the grid (this will trigger a re-render)
    setShowGrid(true)
  }, 2000)

  // Sets up the game logic (duh). This is called after the game-grid component has fully rendered.
  const setupGameLogic = useCallback(grid => {
    if (stageRef.current && imgRef.current) {

      // Create a new instance of GameLogic, passing it the components it
      // requires (via their refs), ..
      const logic = new GameLogic(grid, stageRef.current, imgRef.current)

      // .. make it start, ..
      logic.start()
      setStarted(true)

      // .. listen to when it finishes, ..
      logic.onFinished(() => window.alert('You did it!! (reload the window to play again)'))

    }
  }, [])

  return (
    <>
      <Menu toggleHelp={setShowHelp} />
      <div className="game-wrapper">
        <div ref={stageRef} className="container stage" />
        <div className="grid-wrapper">
          <img
            alt="Kitty"
            src={img}
            className={`
              base-img
              ${isStarted ? 'transparent' : ''}
              ${showHelp ? 'semi-transparent' : ''}
            `}
            ref={imgRef}
            onLoad={onLoadImage}
          />
          {showGrid && (
            <GameGrid
              imgSrc={img}
              width={imgWidth}
              height={imgHeight}
              pieceSizeRatio={2}
              onLoad={setupGameLogic}
            />
          )}
        </div>
      </div>
    </>
  )

}

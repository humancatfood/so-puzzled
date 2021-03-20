import React, {useState} from 'react'
import GameStateStart from './game-state-start.jsx'
import GameStateRunning from './game-state-running.jsx'



// The Game-object. In a larger application should probably be split up more, with
// React JUST providing the presentation layer and the logic factored into it's own
// object, but for a small project like this it's just too convenient.
export default function Game({img}) {

  // the first state that we see in the game, the start-state, with an explanation
  // how to play, etc.
  const [currentGameState, setCurrentGameState] = useState((
    <GameStateStart onStart={start} />
  ))

  // changes to the game state that actually runs the game.
  function start() {
    setCurrentGameState((
      <GameStateRunning img={img} />
    ))
  }

  // Render the game
  return currentGameState;

}

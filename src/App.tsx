import { useState } from 'react'

import Game from './Game'
import StartScreen from './StartScreen'
import img from './images/kitty.jpg'



export default function App() {

  const [isStarted, setStarted] = useState<boolean>(false)

  if (isStarted) {
    return (
      <Game imgSrc={img} />
    )
  } else {
    return (
      <StartScreen onStart={() => setStarted(true)} />
    )
  }

}

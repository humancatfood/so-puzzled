import { useState } from 'react'

import Game from './Game'
import StartScreen from './StartScreen'
import img from './images/kitty.jpg'

export default function App() {
  const [isStarted, setStarted] = useState<boolean>(true)

  if (isStarted) {
    return <Game imgSrc={img} difficulty={3} />
  } else {
    return <StartScreen onStart={() => setStarted(true)} />
  }
}

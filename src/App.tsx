import {useState} from 'react'

import img from './images/kitty.jpg'

import StartScreen from './StartScreen'
import Game from './Game'


export default function App() {

  const [isStarted, setStarted] = useState<Boolean>(false)

  if (isStarted) {
    return (
      <Game img={img} />
    )
  } else {
    return (
      <StartScreen onStart={() => setStarted(true)} />
    )
  }


}

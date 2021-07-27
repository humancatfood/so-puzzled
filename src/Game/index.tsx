import Game from './Game'
import GameWrapper, { GameWrapperProps } from './GameWrapper'

export default function WrapperGame({
  difficulty,
  imgSrc,
}: Omit<GameWrapperProps, 'Game'>) {
  return <GameWrapper Game={Game} difficulty={difficulty} imgSrc={imgSrc} />
}

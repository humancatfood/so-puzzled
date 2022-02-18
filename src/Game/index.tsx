import { Game } from './Game'
import { GameWrapper, GameWrapperProps } from './GameWrapper'

export default function WrappedGame({
  difficulty,
  imgSrc,
}: Omit<GameWrapperProps, 'Game'>) {
  return <GameWrapper Game={Game} difficulty={difficulty} imgSrc={imgSrc} />
}

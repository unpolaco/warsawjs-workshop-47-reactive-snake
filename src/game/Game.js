import React, {useContext} from 'react';
import GameContext from './GameContext'
import useGame from './useGame'
import GameGrid from './GameGrid.jsx'
import GameMenu from './GameMenu';

export default function Game() {
  const { gridSize, paused  } = useContext(GameContext);
  const { fruit, snake } = useGame();

  return (
    <>
    {paused ? <GameMenu/> : null}
    <GameGrid gridSize={gridSize} fruit={fruit} snake={snake}/>
    </>
  )
}
import React, {useContext} from 'react';
import GameContext from './GameContext'
import useGame from './useGame'
import GameGrid from './GameGrid.jsx'

export default function Game() {
  const { gridSize, speed, increaseSpeed  } = useContext(GameContext);
  const { fruit, snake } = useGame({ gridSize, speed, increaseSpeed });

  return (
    <GameGrid gridSize={gridSize} fruit={fruit} snake={snake} />
  )
}
import React, { useCallback, useReducer } from 'react';
import GameContext from './game/GameContext';
import Game from './game/Game';
import gameContextStateReducer, { initGameContextState, InitialGameContextState } from './game/gameContextStateReducer';

function App() {
	const gridSize = 10;
	const SpeedMultiplier = 0.8;

  const [gameContextState, dispatchGameContextAction] = useReducer(
    gameContextStateReducer,
    InitialGameContextState,
    initGameContextState,
	);
	const { paused, speed } = gameContextState;

  const increaseSpeed = useCallback(() => {
    dispatchGameContextAction({ type: 'increaseSpeed', payload: SpeedMultiplier });
  }, []);

  const pauseGame = useCallback(() => {
    dispatchGameContextAction({ type: 'pauseGame' });
  }, []);

  const unpauseGame = useCallback(() => {
    dispatchGameContextAction({ type: 'unpauseGame' });
  }, []);
		
	return (
		<GameContext.Provider value={{ 
				speed, 
				gridSize, 
				increaseSpeed, 
				paused, 
				unpauseGame, 
				pauseGame 
			}}>
				<Game />
		</GameContext.Provider>
	);
}

export default App;

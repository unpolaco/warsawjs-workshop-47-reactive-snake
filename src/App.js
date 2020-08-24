import React, { useState } from 'react';
import Game from './game/Game';
import GameContext from './game/GameContext';

function App() {
	const gridSize = 10;
	const SpeedMultiplier = 0.8;
	const [speed, setSpeed] = useState(500);
	const [paused, setPaused] = useState(true);

	function increaseSpeed() {
		setSpeed((s) => s * SpeedMultiplier);
	}
	function pauseGame() {
		setPaused(true);
	}
	function unpauseGame() {
		setPaused(false);
	}

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

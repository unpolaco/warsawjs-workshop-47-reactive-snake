import React, { useState } from 'react';
// import useGame from './game/useGame';
import Game from './game/Game';
import GameContext from './game/GameContext';

function App() {
	const gridSize = 10;
	const SpeedMultiplier = 0.8;
	const [speed, setSpeed] = useState(500);
	// const { fruit, snake } = useGame({
	// 	speed,
	// 	gridSize: gridSize,
	// 	increaseSpeed,
	// });

	function increaseSpeed() {
		setSpeed((s) => s * SpeedMultiplier);
	}

	return (
		<GameContext.Provider value={{ speed, gridSize, increaseSpeed }}>
			<Game />
		</GameContext.Provider>
	);
}

export default App;

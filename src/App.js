import React, { useState } from 'react';
import useGame from './game/useGame';
import GameGrid from './game/GameGrid';

function App() {
	const GridSize = 10;
	const SpeedMultiplier = 0.8;
	const [speed, setSpeed] = useState(500);
	const { fruit, snake } = useGame({
		speed,
		gridSize: GridSize,
		increaseSpeed,
	});

	function increaseSpeed() {
		setSpeed((s) => s * SpeedMultiplier);
	}

	return <GameGrid gridSize={GridSize} fruit={fruit} snake={snake} />;
}

export default App;

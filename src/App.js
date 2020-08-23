import React, { useState } from 'react';
import GameGrid from './game/GameGrid.jsx';

const GridSize = 10;

function App() {
	const [snake, setSnake] = useState([
		{ x: GridSize / 2, y: GridSize / 2 },
		{ x: GridSize / 2, y: GridSize / 2 + 1 },
		{ x: GridSize / 2, y: GridSize / 2 + 2 },
	]);
	const [fruit, setFruit] = useState({
		x: randomIndex(GridSize),
		y: randomIndex(GridSize),
	});

	function randomIndex(n) {
		return Math.floor(Math.random() * n);
	}

	return <GameGrid gridSize={GridSize} fruit={fruit} snake={snake} />;
}

export default App;

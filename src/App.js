import React, { useState, useEffect } from 'react';
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
  
	const direction = 'down';
	const speed = 500;

	useEffect(() => {
		const interval = setInterval(() => {
			const [snakeHead] = snake;
      const newSnakeHead = { ...snakeHead };
      if (direction === 'up') {
        newSnakeHead.x -= 1;
      } else if (direction === 'down') {
        newSnakeHead.x += 1;
      } else if (direction === 'right') {
        newSnakeHead.y += 1;
      } else if (direction === 'left') {
        newSnakeHead.y -= 1;
      }

    console.log(newSnakeHead);

      const newSnake = [newSnakeHead, ...snake.slice(0, snake.length - 1)];
      setSnake(newSnake);
		}, speed);

		return () => {
			clearInterval(interval);
		};
	}, [snake]);

	function randomIndex(n) {
		return Math.floor(Math.random() * n);
	}

	return <GameGrid gridSize={GridSize} fruit={fruit} snake={snake} />;
}

export default App;

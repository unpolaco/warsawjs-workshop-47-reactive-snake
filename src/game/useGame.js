import { useState, useEffect } from 'react';
import useGameDirection from './useGameDirection';

export default function useGame({ gridSize, speed, increaseSpeed }) {
	const [snake, setSnake] = useState([
		{ x: gridSize / 2, y: gridSize / 2 },
		{ x: gridSize / 2, y: gridSize / 2 + 1 },
		{ x: gridSize / 2, y: gridSize / 2 + 2 },
	]);
	const [fruit, setFruit] = useState({
		x: randomIndex(gridSize),
		y: randomIndex(gridSize),
	});
  const direction = useGameDirection('up')
  
	useEffect(() => {
		const interval = setInterval(() => {
			const [snakeHead] = snake;
			const newSnakeHead = { ...snakeHead };
			const fruitEaten =
				fruit.x === newSnakeHead.x && fruit.y === newSnakeHead.y;

			if (fruitEaten) {
				setFruit({
					x: randomIndex(gridSize),
					y: randomIndex(gridSize),
				});
				increaseSpeed();
			}
			if (direction === 'up') {
				newSnakeHead.x -= 1;
			} else if (direction === 'down') {
				newSnakeHead.x += 1;
			} else if (direction === 'right') {
				newSnakeHead.y += 1;
			} else if (direction === 'left') {
				newSnakeHead.y -= 1;
			}
			const newSnake = fruitEaten
				? [newSnakeHead, ...snake.slice(0, snake.length)]
				: [newSnakeHead, ...snake.slice(0, snake.length - 1)];
			setSnake(newSnake);
		}, speed);

		return () => {
			clearInterval(interval);
		};
	}, [snake, fruit, speed, gridSize, increaseSpeed, direction]);

	function randomIndex(n) {
		return Math.floor(Math.random() * n);
	}
	return { snake, fruit };
}

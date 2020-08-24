import { useState, useContext, useLayoutEffect } from 'react';
import useGameDirection from './useGameDirection';
import useGameLoop from './useGameLoop';
import GameContext from './GameContext';
import useSpaceDownEvent from './useSpaceDownEvent';

export default function useGame() {
	const { gridSize, speed, increaseSpeed, pauseGame, paused } = useContext(
		GameContext
	);
	const [snake, setSnake] = useState([
		{ x: gridSize / 2, y: gridSize / 2 },
		{ x: gridSize / 2, y: gridSize / 2 + 1 },
		{ x: gridSize / 2, y: gridSize / 2 + 2 },
	]);
	const [fruit, setFruit] = useState({
		x: randomIndex(gridSize),
		y: randomIndex(gridSize),
	});
	const direction = useGameDirection('up');
	useGameLoop({ speed, onTick: handleGameTick });
	useSpaceDownEvent(pauseGame);

	useLayoutEffect(() => {
		const newFruit = document.querySelector('.fruitCell');
		newFruit.style =
			'transition: transform 0.5s; transform: rotate3d(1, 1, 1, 360deg);';
	}, [fruit]);

	function handleGameTick() {
		if (!paused) {
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
		}
	}

	function randomIndex(n) {
		return Math.floor(Math.random() * n);
	}

	return { snake, fruit };
}

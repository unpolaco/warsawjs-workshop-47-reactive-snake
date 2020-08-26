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

	let randomFruitPosition = {};
	let fruitOnSnake;

	useLayoutEffect(() => {
		const newFruit = document.querySelector('.fruitCell');
		newFruit.style =
			'transition: transform 0.5s; transform: rotate3d(1, 1, 1, 360deg);';
	}, [fruit]);

	function newFruitPosition() {
		randomFruitPosition = {
			x: randomIndex(gridSize),
			y: randomIndex(gridSize),
		};
		fruitOnSnake = snake.filter(
			(snakePart) =>
				snakePart.x === randomFruitPosition.x &&
				snakePart.y === randomFruitPosition.y
		);
	}

	function setFruitPosition() {
		do {
			newFruitPosition();
		} while (fruitOnSnake.length > 0);
		setFruit(randomFruitPosition);
	}

	function handleGameTick() {
		if (!paused) {
			const [snakeHead] = snake;
			const newSnakeHead = { ...snakeHead };
			const fruitEaten =
				fruit.x === newSnakeHead.x && fruit.y === newSnakeHead.y;

			if (fruitEaten) {
				setFruitPosition();
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
			if(snake.find(snakePart => snakePart.x === newSnakeHead.x && snakePart.y === newSnakeHead.y)) {
				alert("UPS! Snake is eating themself!")
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

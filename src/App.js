import React, { useState, useEffect, useRef } from 'react';
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
  const [speed, setSpeed] = useState(500);

	const direction = useRef('up');
  const SpeedMultiplier = 0.8;

  
	useEffect(() => {
		const interval = setInterval(() => {
			const [snakeHead] = snake;
      const newSnakeHead = { ...snakeHead };
      const fruitEaten = fruit.x === newSnakeHead.x && fruit.y === newSnakeHead.y;

      if (fruitEaten) {
        setFruit({
          x: randomIndex(GridSize),
          y: randomIndex(GridSize),
        })
        setSpeed(s => s * SpeedMultiplier)
      }

      if (direction.current === 'up') {
        newSnakeHead.x -= 1;
      } else if (direction.current === 'down') {
        newSnakeHead.x += 1;
      } else if (direction.current === 'right') {
        newSnakeHead.y += 1;
      } else if (direction.current === 'left') {
        newSnakeHead.y -= 1;
      }
      const newSnake = fruitEaten 
      ? [newSnakeHead, ...snake.slice(0, snake.length)] 
      : [newSnakeHead, ...snake.slice(0, snake.length - 1)] ;
      setSnake(newSnake);
    }, speed);

		return () => {
			clearInterval(interval);
		};
  }, [snake]);
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    }, []);

    function handleKeyDown(e) {
      console.log(e.key);
      if(e.key === 'ArrowUp') {
        direction.current = 'up'
      } else if(e.key === 'ArrowDown') {
        direction.current = 'down'
      } else if(e.key === 'ArrowLeft') {
        direction.current = 'left'
      } else if(e.key === 'ArrowRight') {
        direction.current = 'right'
      }
    }

	function randomIndex(n) {
		return Math.floor(Math.random() * n);
	}

	return <GameGrid gridSize={GridSize} fruit={fruit} snake={snake} />;
}

export default App;

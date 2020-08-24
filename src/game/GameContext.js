import { createContext } from 'react';

const GameContext = createContext({
	gridSize: 0,
	speed: 0,
	paused: true,
	increaseSpeed: () => {},
	pauseGame: () => {},
	unpauseGame: () => {},
});

export default GameContext;

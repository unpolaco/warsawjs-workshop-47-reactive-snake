import React, { useState, useContext } from 'react';
import GameContext from './GameContext';
import './GameMenu.css';

export default function GameMenu() {
	const { unpauseGame } = useContext(GameContext);
	const [gridSize, setGridSize] = useState('10');

	function handleGridSizeChange(e) {
		setGridSize(e.target.value);
	}

	return (
		<div className='gameMenu'>
			<div className='gameMenuOverlay' />
			<div className='gameMenuContent'>
				<button className='playButton' onClick={unpauseGame}>PLAY</button>
        <div className='hints'>
          <p>HINTS</p>
          <p>use SPACEBAR for pause/unpause game</p>
          <p>use ARROWS for move snake</p>
        </div>
				<form className='gridSizeForm'>
					<p>set board game size</p>
					<label htmlFor='10x10'>
						<input
							type='radio'
							id='10x10'
							value='10'
							onChange={handleGridSizeChange}
							checked={gridSize === '10'}
						/>
						10x10
					</label>
					<label htmlFor='12x12'>
						<input
							type='radio'
							id='12x12'
							value='12'
							checked={gridSize === '12'}
							onChange={handleGridSizeChange}
						/>
						12x12
					</label>
					<label htmlFor='15x15'>
						<input
							type='radio'
							id='15x15'
							value='15'
							checked={gridSize === '15'}
							onChange={handleGridSizeChange}
						/>
						15x15
					</label>
				</form>
			</div>
		</div>
	);
}

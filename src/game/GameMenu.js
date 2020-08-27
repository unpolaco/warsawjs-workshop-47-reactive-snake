import React, { useState, useContext } from 'react';
import GameContext from './GameContext';
import './GameMenu.css';

export default function GameMenu() {
  const gridSizeOptions = [
    {value: '10', name: '10x10'},
    {value: '12', name: '12x12'},
    {value: '15', name: '15x15'},
  ]
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
        { gridSizeOptions.map(el => {
					return (
            <label htmlFor={el.name}>
						<input
							type='radio'
							id={el.name}
							key={el.name}
							value={el.value}
							onChange={handleGridSizeChange}
							checked={gridSize === el.value}
						/>
						{el.name}
					</label>
          )
        })}
				</form>
			</div>
		</div>
	);
}

import { useEffect, useRef } from 'react';

export default function useGameDirection(initDirection) {
  const direction = useRef(initDirection);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	function handleKeyDown(e) {
		if (e.key === 'ArrowUp') {
			direction.current = 'up';
		} else if (e.key === 'ArrowDown') {
			direction.current = 'down';
		} else if (e.key === 'ArrowLeft') {
			direction.current = 'left';
		} else if (e.key === 'ArrowRight') {
			direction.current = 'right';
		}
	}

  return direction.current;
}
import { useState } from 'react';
import { useScore } from './score';

export function useController({ shuffleCats, toggleRotate }) {
  const { score, incrementScore, resetScore } = useScore();

  const [selectedCat, setSelectedCat] = useState(new Set());
  const handleClick = (id) => {
    if (score === 12) return;
    toggleRotate();
    if (selectedCat.has(id)) {
      resetScore();
      setSelectedCat(new Set());
    } else {
      setSelectedCat((prevState) => new Set([...prevState, id]));
      incrementScore();
    }
    setTimeout(() => {
      shuffleCats();
    }, 500);
  };

  return { score, resetScore, handleClick };
}

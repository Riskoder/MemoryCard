import { useState } from 'react';

export function useScore() {
  const [score, setScore] = useState(0);

  const incrementScore = () => {
    setScore((prevState) => prevState + 1);
  };

  const resetScore = () => {
    setScore(0);
  };

  return { score, incrementScore, resetScore };
}

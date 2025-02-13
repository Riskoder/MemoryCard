import { useEffect, useState } from 'react';
import { ResetBtn } from './resetBtn';

export function ScoreSection({ score, resetScore }) {
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score]);

  return (
    <section className="score-section">
      {score === 12 && <ResetBtn resetScore={resetScore} />}
      <div>
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
      </div>
    </section>
  );
}

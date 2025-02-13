import { useCatsData } from './hooks/catData';
import { useController } from './hooks/controller';
import { useToggleStyle } from './hooks/insertStyle';
import { Title } from './components/title';
import { ScoreSection } from './components/showScore';
import { CardContainer } from './components/cardContainer';
import Card from './components/card';

export default function RefactoredApp() {
  const { cats, shuffleCats, loading, error } = useCatsData();
  const { rotate, toggleRotate } = useToggleStyle();
  const { score, resetScore, handleClick } = useController({
    shuffleCats,
    toggleRotate,
  });

  return (
    <>
      <header>
        <div>
          <Title />
          <ScoreSection score={score} resetScore={resetScore} />
        </div>
      </header>
      <main>
        {cats && (
          <CardContainer>
            {cats.map((cat) => (
              <Card
                key={cat.id}
                {...cat}
                handleClick={handleClick}
                rotate={rotate}
              />
            ))}
          </CardContainer>
        )}
      </main>
      <footer>
        <a href="https://www.flaticon.com/free-icons/paw" title="paw icons">
          Paw icons created by Mihimihi - Flaticon
        </a>
      </footer>
    </>
  );
}

import { useState, useEffect } from 'react';

export default function App() {
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchData = async (limit = 12) => {
      try {
        const [catInfoResponse, catNameResponse] = await Promise.all([
          fetch(`https://cataas.com/api/cats?tags=fat&limit=${limit}`),
          fetch(`https://tools.estevecastells.com/api/cats/v1?limit=${limit}`),
        ]);

        if (!catInfoResponse.ok || !catNameResponse.ok)
          throw new Error('Error fetching the data');

        const [catInfo, catName] = await Promise.all([
          catInfoResponse.json(),
          catNameResponse.json(),
        ]);

        const catsInformation = catInfo.map((cat, i) => ({
          id: cat.id,
          url: `https://cataas.com/cat/${cat.id}`,
          name: catName[i] || `Cat ${index}`,
        }));

        setCats(catsInformation);
      } catch (err) {
        console.error(err.status, err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const incrementScore = () => {
    setScore((prev) => prev + 1);
  };

  const resetScore = () => {
    setScore(0);
  };

  const handleClick = (id) => {
    if (score === 12) return;
    if (selectedCat.has(id)) {
      resetScore();
      setSelectedCat(new Set());
    } else {
      setSelectedCat((prevState) => new Set([...prevState, id]));
      incrementScore();
    }
    setCats(shuffleArray(cats));
    console.log(cats);
  };

  const resetGame = () => {
    setScore(0);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An Error ocurred: {error}</p>;

  return (
    <>
      <h1>Memory Card</h1>
      <p>{score}</p>

      {score === 12 && (
        <div>
          <h2>You Win!</h2> <button onClick={resetGame}>Restart Game</button>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cats.map((cat) => (
          <div
            key={cat.id}
            style={{ margin: '10px' }}
            onClick={() => handleClick(cat.id)}>
            <img
              src={cat.url}
              alt={`Cat ${cat.id}`}
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

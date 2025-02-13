import { useState, useEffect, useCallback } from 'react';
import { useFetch } from './useFetch';
import { catNames } from '../services/catNames';
import { catInformation } from '../services/catInformation';
import { shuffleArray } from '../utils/shuffleArray';

export function useCatsData() {
  const {
    data: newCatsInfo,
    loading: loadingImg,
    error: errorImg,
  } = useFetch(() => catInformation(), []);

  const {
    data: newCatNames = [],
    loading: loadingNames,
    error: errorNames,
  } = useFetch(() => catNames(), []);

  const [cats, setCats] = useState([]);

  console.log(newCatNames);

  useEffect(() => {
    if (newCatsInfo) {
      const catsInfo = newCatsInfo.map((cat, index) => ({
        id: cat.id,
        url: `https://cataas.com/cat/${cat.id}`,
        name: newCatNames[index] || `Cat ${index}`,
      }));

      setCats(catsInfo);
    }
  }, [newCatNames, newCatsInfo]);

  const shuffleCats = () => {
    setCats(shuffleArray(cats));
  };

  return {
    cats,
    shuffleCats,
    loading: loadingImg || loadingNames,
    error: errorImg || errorNames,
  };
}

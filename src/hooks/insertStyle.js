import { useState, useEffect } from 'react';

export function useToggleStyle() {
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    if (rotate) {
      const timer = setTimeout(() => {
        setRotate(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [rotate]);

  const toggleRotate = () => {
    setRotate(true);
  };

  return { rotate, toggleRotate };
}

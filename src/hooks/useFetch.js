import { useEffect, useState } from 'react';

export function useFetch(apiFunc, dependencies = []) {
  const [values, setValues] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      setValues((prevState) => ({ ...prevState, loading: true, error: false }));

      try {
        const result = await apiFunc();

        if (!abortController.signal.aborted) {
          setValues({ data: result, loading: false, error: null });
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          setValues({
            data: null,
            loading: false,
            error: err.message || 'Error Fetching data',
          });
        }
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, dependencies);

  return values;
}

import { useEffect, useState } from 'react';

// Runs an async fetcher and tracks loading / data / error.
// Pass values the fetcher depends on (like an id) in `deps`.
export default function useFetch(fetcher, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false; // avoids updating state after the component unmounts
    const load = async () => {
      setState({ data: null, loading: true, error: null });
      try {
        const data = await fetcher();
        if (!ignore) setState({ data, loading: false, error: null });
      } catch (err) {
        if (!ignore) setState({ data: null, loading: false, error: err.message });
      }
    };
    load();
    return () => { ignore = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  return { ...state, retry: () => setAttempt((count) => count + 1) };
}

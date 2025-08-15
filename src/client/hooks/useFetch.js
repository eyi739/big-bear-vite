import { useState, useEffect } from "react";

export default function useFetch(path) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setIsPending(true);
      setError(null);

      try {
        const res = await fetch(`http://localhost:8080${path}`, { signal });

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error(err);
          setError(err);
        }
      } finally {
        setIsPending(false);
      }
    };

    fetchData();

    // Cleanup function to abort fetch on unmount
    return () => controller.abort();
  }, [path]);

  return { data, error, isPending };
}

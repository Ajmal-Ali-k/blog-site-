import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortCount = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCount.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch data from the resourses");
          }
          return res.json();
        })
        .then((data) => {
          setIsPending(false);
          setData(data);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setError(err.message);
            setIsPending(false);
          }
        });
    }, 1000);

    return () => abortCount.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;

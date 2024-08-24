import { useState, useEffect } from "react";

function useFetchData(url, limit = null) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let fetchUrl = url;

    if (limit) {
      // Append _limit query parameter if limit is provided
      fetchUrl += `?_limit=${limit}`;
    }

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(`Error: ${err}`));
  }, [url, limit]);

  return { data };
}

export default useFetchData;

import { useEffect, useState } from "react";

export const usePaginated = (getFunction, pageSize) => {
  const [page, setPage] = useState(0);
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const [data, setData] = useState([]);

  const next = () => {
    setPage((page) => page + 1);
  };

  const prev = () => {
    setPage((page) => Math.max(0, page - 1));
  };

  useEffect(() => {
    setPage(0);
  }, [getFunction]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, hasMoreContent } = await getFunction(page, pageSize);
      setHasMoreContent(hasMoreContent);
      setData(data);
    };
    fetchData();
  }, [getFunction, page, pageSize]);

  return { hasMoreContent, data, next, prev, page, setPage };
};

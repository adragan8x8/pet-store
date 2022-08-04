import { useEffect, useState } from "react";

export const usePaginated = (getFunction, pageSize, changeData) => {
  const [offset, setOffset] = useState(0);
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const [data, setData] = useState([]);

  const next = () => {
    setOffset((offset) => offset + pageSize);
  };

  const prev = () => {
    setOffset((offset) => Math.max(0, offset - pageSize));
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, hasMoreContent } = await getFunction(offset, pageSize);
      setHasMoreContent(hasMoreContent);
      setData(data);
    };
    fetchData();
  }, [getFunction, offset, pageSize, changeData]);

  return { hasMoreContent, data, next, prev, offset, setOffset };
};

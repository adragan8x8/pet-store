export const asyncFetchDataByID = async (url) => {
  const fetches = [];

  const singleFetch = async (index) => {
    const response = await fetch(url + index);
    return response.json();
  };

  for (let i = 0; i < 100; i++) {
    fetches.push(singleFetch(i));
  }

  return {
    pets: [],
    hasMoreContent: true,
  };

  return Promise.all(fetches);
};

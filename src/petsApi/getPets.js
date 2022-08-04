export const getPets = async (offset, pageSize) => {
  const fetches = [];

  const singleFetch = async (index) => {
    const response = await fetch(`https://petstore.swagger.io/v2/pet/${index}`);
    return response.json();
  };

  for (let i = 0; i < offset + pageSize; i++) {
    fetches.push(singleFetch(i));
  }

  const pets = await Promise.all(fetches);

  return {
    data: pets.slice(-pageSize),
    hasMoreContent: offset + pageSize < 100,
  };
};

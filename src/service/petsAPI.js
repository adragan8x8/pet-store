export const getPet = async (index) => {
  const response = await fetch(`https://petstore.swagger.io/v2/pet/${index}`);
  return response.json();
};

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

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: pets.slice(-pageSize),
        hasMoreContent: offset + pageSize < 100,
      });
    }, 2000);
  });

  return {
    data: pets.slice(-pageSize),
    hasMoreContent: offset + pageSize < 100,
  };
};

export const updatePet = async (data) => {
  const response = await fetch("https://petstore.swagger.io/v2/pet", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.ok;
};

export const addPet = async (data) => {
  const response = await fetch("https://petstore.swagger.io/v2/pet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const deletePet = async (index) => {
  return await fetch(`https://petstore.swagger.io/v2/pet/${index}`, {
    method: "DELETE",
  });
};

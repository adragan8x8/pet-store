export const getPet = async (index) => {
  const response = await fetch(`/api/v1/pets/${index}`);
  return response.json();
};

export const getPets = async (page, pageSize) => {
  const response = await fetch(`/api/v1/pets?page=${page}&size=${pageSize}`);
  const data = await response.json();
  return {
    data: data._embedded.petList,
    hasMoreContent: data.page.number !== data.page.totalPages,
  };
};

export const updatePet = async (data) => {
  const response = await fetch(`/api/v1/pets/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.ok;
};

export const addPet = async (data) => {
  const response = await fetch("/api/v1/pets/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const deletePet = async (index) => {
  return await fetch(`/api/v1/pets//${index}`, {
    method: "DELETE",
  });
};

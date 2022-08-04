export const updatePet = async (data) => {
  const response = await fetch("https://petstore.swagger.io/v2/pet", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.ok;
};

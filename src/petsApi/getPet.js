export const getPet = async (index) => {
  const response = await fetch(`https://petstore.swagger.io/v2/pet/${index}`);
  return response.json();
};

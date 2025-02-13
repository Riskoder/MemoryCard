export async function catNames(limit = 10) {
  const response = await fetch(
    `https://tools.estevecastells.com/api/cats/v1?limit=${limit}`
  );
  if (!response.ok) throw new Error('Error fetching the Data');

  const catNames = await response.json();
  return catNames;
}

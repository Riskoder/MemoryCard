import { randomCatTag } from '../utils/randomTag';

export async function catInformation(limit = 10, tag = null) {
  if (!tag) {
    tag = randomCatTag();
  }

  const response = await fetch(
    `https://cataas.com/api/cats?tags=${tag}&limit=${limit}`
  );

  if (!response.ok)
    throw new Error(
      'An error ocurred while fetching the cat data. Please try again.'
    );

  const catInfo = await response.json();
  return catInfo;
}

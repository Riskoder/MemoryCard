const catTags = ['silly', 'orange', 'fat', 'cute', 'sleepy', 'black', 'white'];

export function randomCatTag() {
  const index = Math.floor(Math.random() * catTags.length);

  return catTags[index];
}

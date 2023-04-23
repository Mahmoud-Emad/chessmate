export function generateUsername(): string {
  const words = [
    'Galaxy',
    'Nebula',
    'Cosmos',
    'Star',
    'Planet',
    'Asteroid',
    'Comet',
    'Meteor',
    'Gravity',
    'Orbit',
  ];
  const index = Math.floor(Math.random() * words.length);
  console.log(words[index]);

  return words[index];
}

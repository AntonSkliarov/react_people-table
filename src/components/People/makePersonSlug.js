export function makePersonSlug(person) {
  return `${person.name.replace(' ', '-')}-${person.born}`.toLowerCase();
}

export function sortObjectsByKey(people, key) {
  return people.sort((prevObj, nextObj) => {
    if (typeof prevObj[key] === 'string') {
      return prevObj[key].localeCompare(nextObj[key]);
    }

    if (typeof prevObj[key] === 'number') {
      return prevObj[key] - nextObj[key];
    }

    return 0;
  });
}

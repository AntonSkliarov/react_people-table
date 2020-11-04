import { requiredValidator, minLengthValidator } from '../../utils';

export function validateNewPerson(newPerson) {
  const errorsEntries = Object.entries(newPerson).map(([name, value]) => {
    let error = requiredValidator(name, value);

    if (!error && name === 'name') {
      error = minLengthValidator(name, value);
    }

    return [name, error];
  });

  const hasErrors = errorsEntries.some(([, error]) => !!error);

  const errors = errorsEntries.reduce((acc, [name, error]) => {
    return {
      ...acc,
      [name]: error,
    };
  }, {});

  return {
    errors,
    hasErrors,
  };
}

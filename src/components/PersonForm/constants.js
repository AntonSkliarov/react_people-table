import { peopleConfig } from '../../constants';

export const initialValues = peopleConfig.reduce((acc, name) => {
  return {
    ...acc,
    [name]: '',
  };
}, {});

export const initialErrors = peopleConfig.reduce((acc, name) => {
  return {
    ...acc,
    [name]: null,
  };
}, {});

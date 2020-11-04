export function requiredValidator(name, value) {
  return value
    ? null
    : `Field ${name} is required`;
}

export function minLengthValidator(name, value) {
  return value.length >= 3
    ? null
    : `Field ${name} should have at least 3 symbols`;
}

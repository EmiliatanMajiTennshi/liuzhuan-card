/**
 * 空值判断
 * @param value
 */
export const emptyRender = (value: unknown) => {
  return !value && !(value === 0 || value === false) ? "—" : value;
};

export const isEmptyField = (value: unknown) => {
  return value || value === 0;
};

export const generateRandomColor: () => string = () => {
  const minValue = 100;

  const random = () =>
    Math.floor(Math.random() * (255 - minValue + 1) + minValue);

  return `#${random().toString(16)}${random().toString(16)}${random().toString(
    16,
  )}`;
};

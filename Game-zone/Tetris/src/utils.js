export const randomIntBelow = (limit) => Math.floor(Math.random() * limit);

export const rotateRight = (array) =>
  array[0].map((_, i) => array.map((row) => row[i]).reverse());

export const getCenterOffset = (total, part) => Math.floor((total - part) / 2);

export const setMatrix = (matrix, row, column, element) =>
  matrix[row][column] = element;

export const isBetween = (value, limit) => 0 <= value && value < limit;

export const midPoint = (totalLength, itemLength) =>
  +Math.floor((totalLength + itemLength) / 2);

export const createGrid = (height, width, filler) =>
  Array.from({ length: height }, () => Array(width).fill(filler));

export const leftAlign = (text, length) => text.padEnd(length);

export const centerAlign = (text, length) => {
  const padLength = midPoint(length, text.length);
  return text.padStart(padLength).padEnd(length);
};

export const repeat = (char, length) => char.repeat(length);

export const wrapWith = (char, content) => char + content + char;

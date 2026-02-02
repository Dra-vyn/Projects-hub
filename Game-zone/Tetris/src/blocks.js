export const COLORS = {
  1: "🟥",
  2: "🟨",
  3: "🟪",
  4: "🟧",
  5: "🟦",
  6: "🟩",
  7: "⬜️",
};

export const BLOCKS = [
  { tetrimino: [[1, 1, 0], [0, 1, 1]], color: 1 }, // Z
  { tetrimino: [[1, 0], [1, 0], [1, 1]], color: 2 }, // L
  { tetrimino: [[1, 1, 1, 1]], color: 3 }, // I
  { tetrimino: [[0, 1, 0], [1, 1, 1]], color: 4 }, // T
  { tetrimino: [[1, 1], [1, 1]], color: 5 }, // O
  { tetrimino: [[0, 1, 1], [1, 1, 0]], color: 6 }, // S
  { tetrimino: [[0, 1], [0, 1], [1, 1]], color: 7 }, // J
];
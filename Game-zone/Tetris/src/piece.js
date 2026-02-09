import { rotateRight } from "./utils.js";

export class Piece {
  constructor({ tetrimino, color, x, y }) {
    this.tetrimino = tetrimino;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  moved(px, py) {
    return new Piece({ ...this, x: this.x + px, y: this.y + py });
  }

  rotate() {
    const rotated = rotateRight(this.tetrimino);
    return new Piece({ ...this, tetrimino: rotated });
  }
}
export class Piece {
  constructor(tetrimino, color, x, y) {
    this.tetrimino = tetrimino;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  moved(px, py) {
    return new Piece(this.tetrimino, this.color, this.x + px, this.y + py);
  }

  rotate(tetrimino) {
    const rotated = this.#rotateBlock(tetrimino);
    return new Piece(rotated, this.color, this.x, this.y);
  }

  #rotateBlock(block) {
    return block[0].map((_, i) => block.map((row) => row[i]).reverse());
  }
}
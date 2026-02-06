import { Formatter } from "./format.js";

export class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.format = new Formatter();
    this.init();
  }

  init() {
    this.grid = this.createBoard()
  }

  createBoard() {
    return Array.from({ length: this.height }, () => Array(this.width).fill(0));
  }

  createTempBoard() {
    return this.grid.map((row) => row.slice());
  }

  drawPieceOn({ tetrimino, color, x, y }, board) {
    tetrimino.forEach((row, dy) =>
      row.forEach((cell, dx) => {
        if (cell) board[y + dy][x + dx] = color;
      })
    );
  }

  lockPiece(piece) {
    return this.drawPieceOn(piece, this.grid);
  }

  clearLines() {
    this.grid = this.getUnfilledRows();
    while (this.grid.length < this.height) {
      this.grid.unshift(Array(this.width).fill(0));
    }
  }

  getUnfilledRows() {
    return this.grid.filter((row) => row.some((cell) => !cell));
  }

  isInside(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  isCellOccupied(x, y) {
    return !this.isInside(x, y) || this.grid[y][x];
  }

  isPieceColliding({ tetrimino, x, y }) {
    return tetrimino.some((row, py) =>
      row.some((cell, px) => cell && this.isCellOccupied(x + px, y + py))
    );
  }

  draw(piece) {
    console.clear();
    const temp = this.createTempBoard();
    if (piece) this.drawPieceOn(piece, temp);
    const output = this.format.frameTetrisSpace(this.width, temp);
    console.log(output);
  }
}
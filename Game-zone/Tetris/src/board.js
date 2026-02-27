// import { TerminalFrameRenderer } from "./renderer.js";
import { isBetween, setMatrix } from "./utils.js";

export class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    // this.build = new FrameRenderer(width);
    this.grid = this.createBoard();
  }

  createBoard() {
    return Array.from({ length: this.height }, () => Array(this.width).fill(0));
  }

  createTempBoard() {
    return this.grid.map((row) => row.slice());
  }

  drawPieceOn(board, { tetrimino, color, x, y }) {
    tetrimino.forEach((row, dy) =>
      row.forEach((cell, dx) => {
        if (cell) setMatrix(board, y + dy, x + dx, color);
      })
    );
  }

  lockPiece(piece) {
    return this.drawPieceOn(this.grid, piece);
  }

  clearLines() {
    this.grid = this.getUnfilledRows();
    const linesCleared = this.height - this.grid.length;

    while (this.grid.length < this.height) {
      this.grid.unshift(Array(this.width).fill(0));
    }

    return linesCleared;
  }

  getUnfilledRows() {
    return this.grid.filter((row) => row.some((cell) => !cell));
  }

  isInside(x, y) {
    return isBetween(x, this.width) && isBetween(y, this.height);
  }

  isCellOccupied(x, y) {
    return !this.isInside(x, y) || this.grid[y][x];
  }

  isPieceColliding({ tetrimino, x, y }) {
    return tetrimino.some((row, py) =>
      row.some((cell, px) => cell && this.isCellOccupied(x + px, y + py))
    );
  }

  render(piece) {
    const temp = this.createTempBoard();
    this.drawPieceOn(temp, piece);
    return temp;
  }

  // draw(game) {
  //   console.clear();
  //   const grid = this.render(game.activePiece);
  //   const output = this.build.render(grid, game);
  //   console.log(output); 
  // }
}

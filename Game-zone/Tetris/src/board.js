import { COLORS } from "./blocks.js";

export class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = this.createBoard();
    this.edge = "🟫";
    this.topBottomBorder = this.edge + this.edge.repeat(this.width) + this.edge;
    this.heading = this.formatHeading();
  }

  createBoard() {
    return Array.from({ length: this.height }, () => Array(this.width).fill(0));
  }

  createTempBoard() {
    return this.grid.map((row) => row.slice());
  }

  addBlock({ block, x, y }, board) {
    block.tetrimino.forEach((row, dy) =>
      row.forEach((cell, dx) => {
        if (cell) board[y + dy][x + dx] = block.color;
      })
    );
  }

  lockPiece(piece) {
    return this.addBlock(piece, this.grid);
  }

  clearLines() {
    console.log(this.grid.length);
    this.grid = this.grid.filter((row) => row.some((cell) => !cell));
    console.log(this.grid.length, "grid");
    while (this.grid.length < this.height) {
      this.grid.unshift(Array(this.width).fill(0));
    }
  }

  isInside(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  isCellOccupied(x, y) {
    return !this.isInside(x, y) || this.grid[y][x];
  }

  isPieceColliding(piece) {
    const { block, x, y } = piece;
    return block.tetrimino.some((row, dy) =>
      row.some((cell, dx) => cell && this.isCellOccupied(x + dx, y + dy))
    );
  }

  formatHeading() {
    const topBorder = `┏━${"━━".repeat(this.width)}━┓`;
    const padSpace = "  ".repeat(this.width / 2 - 1);
    const heading = `┃${padSpace} TETRIS ${padSpace}┃`;
    const bottomBorder = `┗━${"━━".repeat(this.width)}━┛`;
    return [topBorder, heading, bottomBorder];
  }

  formatRow(row) {
    const middle = row.map((cell) => cell ? COLORS[cell] : "  ").join("");
    return this.edge.concat(middle, this.edge);
  }

  format(grid) {
    const rows = grid.map((row) => this.formatRow(row));
    return [
      ...this.heading,
      this.topBottomBorder,
      ...rows,
      this.topBottomBorder,
    ].join("\n");
  }

  draw(piece) {
    console.clear();
    const temp = this.createTempBoard();
    if (piece) this.addBlock(piece, temp);
    const output = this.format(temp);
    console.log(output);
  }
}
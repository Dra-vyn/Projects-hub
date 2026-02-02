import { Board } from "./board.js";
import { BLOCKS } from "./blocks.js";

export class Tetris {
  constructor(width, height) {
    this.board = new Board(width, height);
    this.spawnPiece();
  }

  spawnPosition(block) {
    return {
      x: Math.floor(this.board.width / 2 - block.tetrimino[0].length / 2),
      y: 0,
    };
  }

  spawnPiece() {
    const block = this.randomTetrimino();
    this.piece = { block, ...this.spawnPosition(block) };
    if (this.board.isPieceColliding(this.piece)) this.gameOver();
  }

  randomTetrimino() {
    return BLOCKS[Math.floor(Math.random() * BLOCKS.length)];
  }

  translate(dx, dy) {
    const { block, x, y } = this.piece;
    const newPos = { block, x: x + dx, y: y + dy };
    if (!this.board.isPieceColliding(newPos)) this.piece = newPos;
  }

  rotate(block) {
    return block[0].map((_, i) => block.map((row) => row[i]).reverse());
  }

  rotatePiece() {
    const rotated = { color: this.piece.block.color };
    rotated.tetrimino = this.rotate(this.piece.block.tetrimino);
    const nextPiece = { ...this.piece, block: rotated };
    if (!this.board.isPieceColliding(nextPiece)) {
      this.piece.block = rotated;
    }
  }

  finalizePiece() {
    this.board.lockPiece(this.piece);
    this.board.clearLines();
    this.spawnPiece();
  }

  update() {
    const nextPos = { ...this.piece, y: this.piece.y + 1 };
    this.board.isPieceColliding(nextPos)
      ? this.finalizePiece()
      : this.piece.y++;

    this.board.draw(this.piece);
  }

  gameOver() {
    console.clear();
    console.log("%c 💀 GAME OVER", "color : red");
    Deno.exit();
  }
}

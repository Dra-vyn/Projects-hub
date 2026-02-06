import { Board } from "./board.js";
import { BLOCKS } from "./blocks.js";

export class Tetris {
  constructor(width, height) {
    this.board = new Board(width, height);
    this.#init();
  }

  #init() {
    this.advanceToNextPiece();
  }

  advanceToNextPiece() {
    this.activePiece = this.spawnPiece();
    this.handleGameOver();
    return this.activePiece;
  }

  handleGameOver() {
    if (!this.canPlacePiece(this.activePiece)) this.gameOver();
  }

  spawnPosition(block) {
    return {
      x: Math.floor(this.board.width / 2 - block.tetrimino[0].length / 2),
      y: 0,
    };
  }

  spawnPiece() {
    const block = this.randomTetrimino()
    return { ...block, ...this.spawnPosition(block) };
  }

  randomTetrimino() {
    return BLOCKS[Math.floor(Math.random() * BLOCKS.length)];
  }

  move(dx, dy) {
    const movedPiece = this.getMovedPiece(dx, dy);
    if (this.canPlacePiece(movedPiece))
      this.activePiece = movedPiece;
  }

  getMovedPiece(dx = 0, dy = 1) {
    const x = this.activePiece.x + dx;
    const y = this.activePiece.y + dy;
    return { ...this.activePiece, x, y };
  }

  canPlacePiece(piece) {
    return !this.board.isPieceColliding(piece);
  }

  rotateBlock(block) {
    return block[0].map((_, i) => block.map((row) => row[i]).reverse());
  }

  rotate(piece) {
    const rotated = this.rotateBlock(piece.tetrimino);
    const nextPiece = { ...piece, tetrimino: rotated};
    if (!this.board.isPieceColliding(nextPiece)) piece.tetrimino = rotated;
  }

  finalizePiece() {
    this.board.lockPiece(this.activePiece);
    this.board.clearLines();
    this.advanceToNextPiece();
  }

  update() {
    const movedPiece = this.getMovedPiece(0, 1);
    this.canPlacePiece(movedPiece)
      ? this.activePiece.y++
      : this.finalizePiece();
    
    this.board.draw(this.activePiece);
  }

  gameOver() {
    console.clear();
    console.log("%c 💀 GAME OVER", "color : red");
    Deno.exit();
  }
}

import { Board } from "./board.js";
import { BLOCKS } from "./blocks.js";
import { Piece } from "./piece.js";

export class Tetris {
  constructor(width, height) {
    this.board = new Board(width, height);
    this.score = {
      points: 0,
      lines: 0,
      level: 1,
    }
    
    this.spawnPiece();
  }

  spawnPiece() {
    this.advanceToNextPiece();
    this.nextPiece = this.getNewPiece();
  }

  advanceToNextPiece() {
    this.activePiece = this.nextPiece || this.getNewPiece();
    this.handleGameOver();
    return this.activePiece;
  }

  getNewPiece() {
    const block = this.randomTetrimino();
    const { x, y } = this.spawnPosition(block);
    return new Piece(block.tetrimino, block.color, x, y);
  }

  randomTetrimino() {
    return BLOCKS[this.getRandomBlockIndex()];
  }

  getRandomBlockIndex() {
    return Math.floor(Math.random() * BLOCKS.length);
  }

  spawnPosition(block) {
    return {
      x: Math.floor(this.board.width / 2 - block.tetrimino[0].length / 2),
      y: 0,
    };
  }

  handleGameOver() {
    if (!this.canPlacePiece(this.activePiece)) this.gameOver();
  }

  canPlacePiece(piece) {
    return !this.board.isPieceColliding(piece);
  }

  moveLeft() {
    this.move(-1, 0);
  }

  moveRight() {
    this.move(1, 0);
  }

  softDrop() {
    this.move(0, 1);
    this.score.points++;
  }

  hardDrop() {
    let points = -2;
    while (this.canPlacePiece(this.activePiece)) {
      this.activePiece.y++;
      points += 2;
    }

    this.activePiece.y--;
    this.score.points += points;
    this.board.lockPiece(this.activePiece);
  }

  rotate() {
    this.rotatePiece(this.activePiece);
  }

  move(dx, dy) {
    const movedPiece = this.activePiece.moved(dx, dy);
    if (this.canPlacePiece(movedPiece)) this.activePiece = movedPiece;
  }

  rotatePiece(piece) {
    const rotated = piece.rotate(piece.tetrimino);
    if (!this.board.isPieceColliding(rotated)) this.activePiece = rotated;
  }

  update() {
    const movedPiece = this.activePiece.moved(0, 1);

    if (this.canPlacePiece(movedPiece)) {
      this.activePiece = movedPiece;
    } else {
      this.finalizePiece();
    }

    this.board.draw(this);
  }

  finalizePiece() {
    this.board.lockPiece(this.activePiece);
    const linesCleared = this.board.clearLines();
    this.updateScore(linesCleared);
    this.spawnPiece();
  }

  updateScore(linesCleared) {
    const points = { 0: 0, 1: 40, 2: 100, 3: 300, 4: 1200 };
    this.score.points += points[linesCleared] * this.score.level;
    this.score.lines += linesCleared;
    this.score.level = Math.floor(this.score.lines / 10) + 1;
  }

  gameOver() {
    console.clear();
    console.log("%c 💀 GAME OVER", "color : red");
    Deno.exit();
  }
}

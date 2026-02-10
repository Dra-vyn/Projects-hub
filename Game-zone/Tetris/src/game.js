import { Board } from "./board.js";
import { BLOCKS } from "./blocks.js";
import { Piece } from "./piece.js";
import { getCenterOffset, randomIntBelow } from "./utils.js";
import { maxOf } from "@std/collections";

export class Tetris {
  constructor(width, height) {
    this.board = new Board(width, height);
    this.score = { points: 0, lines: 0, level: 1 };
    this.points = { 0: 0, 1: 40, 2: 100, 3: 300, 4: 1200 };
    this.title = "T E T R I S";
    this.overlayText = {
      paused: `PAUSED: Press ESC to Continue`,
      gameOver: `Game Over!`
    }

    this.state = {
      isPaused: false,
      isGameOver: false,
      isRestart: false,
      isExit: false,
    }

    this.instructions = [
      `  ⬅️   : MOVE LEFT`,
      `  ➡️   : MOVE RIGHT`,
      `  ⬇️   : SOFT DROP`,
      `  ⬆️   : ROTATE PIECE`,
      `  SPACE : HARD DROP`,
      "",
      `  ESC : PAUSE / CONTINUE`,
      `  r : RESTART`,
      `  q : EXIT`,
      `  CTRL + C : FORCE QUIT`,
    ];
    
    this.init();
    this.spawnPiece();
  }

  init() {
    this.maxPieceHeight = maxOf(BLOCKS, (blocks) => blocks.tetrimino.length);
  }

  spawnPiece() {
    this.activateNextPiece();
    this.queueNextPiece();
  }

  queueNextPiece() {
    this.nextPiece = this.createPiece()
  }

  activateNextPiece() {
    this.activePiece = this.nextPiece || this.createPiece();
    this.handleGameOver();
    return this.activePiece;
  }

  createPiece() {
    const block = this.randomTetrimino();
    const { x, y } = this.spawnPosition(block);
    return new Piece({ ...block, x, y });
  }

  randomTetrimino() {
    const length = BLOCKS.length;
    return BLOCKS[randomIntBelow(length)];
  }

  spawnPosition(block) {
    const length = block.tetrimino[0].length;
    const totalWidth = this.board.width;
    
    return { x: getCenterOffset(totalWidth, length), y: 0 };
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
    this.finalizePiece();
  }

  move(dx, dy) {
    const movedPiece = this.activePiece.moved(dx, dy);
    if (this.canPlacePiece(movedPiece)) this.activePiece = movedPiece;
  }

  rotate() {
    const rotated = this.activePiece.rotate();
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
    this.score.points += this.points[linesCleared] * this.score.level;
    this.score.lines += linesCleared;
    this.score.level = Math.floor(this.score.lines / 10) + 1;
  }

  togglePause() {
    this.state.isPaused = !this.state.isPaused;
  }

  restart() {
    this.state.isRestart = true;
  }

  exit() {
    this.state.isExit = true;
  }

  gameOver() {
    console.clear();
    console.log("%c 💀 GAME OVER", "color : red");
    Deno.exit();
  }
}

import { Controls } from "./controls.js";
import { Tetris } from "./game.js";

const advanceGame = (control, game) => {
  if (control.paused) return;
  game.update();
};

export const boot = async () => {
  const game = new Tetris(15, 30);
  const control = new Controls(game);
  const speed = Math.max(100, 500 - game.score.level * 40);
  
  game.board.draw(game.activePiece, game.nextPiece, game.score);
  setInterval(() => advanceGame(control, game), speed);
  await control.inputListener();
};
import { Controls } from "./controls.js";
import { Tetris } from "./game.js";

const advanceGame = (control, game) => {
  if (control.paused) return;
  game.update();
};

const getSpeed = ({ score }) => Math.max(100, 500 - score.level * 40);

export const boot = async () => {
  const game = new Tetris(15, 30);
  const control = new Controls(game);

  const speed = getSpeed(game);

  game.board.draw(game);
  setInterval(() => advanceGame(control, game), speed);
  await control.inputListener();
};

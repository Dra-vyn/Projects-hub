import { Controls } from "./controls.js";
import { Tetris } from "./game.js";

const advanceGame = (game) => {
  if (game.state.isPaused) return;
  game.update();
};

const calculateSpeed = (level) => Math.max(100, 500 - (level * 50));

export const boot = async () => {
  const game = new Tetris(15, 30);
  const control = new Controls(game);

  await startGame(game, control);
  if (game.state.isRestart) return await boot();
};

const startGame = async (game, control) => {
  const speed = calculateSpeed(game.score.level);

  game.board.draw(game);
  const intervalID = setInterval(() => advanceGame(game), speed);
  await control.inputListener();

  clearInterval(intervalID);

};

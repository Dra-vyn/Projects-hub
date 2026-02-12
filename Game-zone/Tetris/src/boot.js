import { Controls } from "./controls.js";
import { Tetris } from "./game.js";

const advanceGame = (game) => {
  if (game.state.isPaused || game.state.isGameOver) return;
  game.update();
};

const calculateSpeed = (level) => Math.max(100, 500 - (level * 70));

export const boot = async () => {
  while (true) {
    const game = new Tetris(15, 30);
    const control = new Controls(game);
  
    await startGame(game, control);
    if (!game.state.isRestart) return game.score;
  }
};

const startGame = async (game, control) => {
  const speed = calculateSpeed(game.score.level);

  game.draw();
  const intervalID = setInterval(() => advanceGame(game), speed);
  await control.listenInput();

  clearInterval(intervalID);
  return game.score;
};

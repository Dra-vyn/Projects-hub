import { Controls } from "../input/controls.js";
import { Tetris } from "./game.js";
import { TerminalFrameRenderer } from "../render/terminal_renderer.js";

const advanceGame = (game, renderer) => {
  if (game.state.isPaused || game.state.isGameOver) return;
  game.update();
  renderer.render(game.getState());
};

const calculateSpeed = (level) => Math.max(100, 500 - (level * 70));

const startGame = async (game, control, renderer) => {
  const speed = calculateSpeed(game.score.level);
  
  const intervalID = setInterval(() => advanceGame(game, renderer), speed);
  await control.listenInput();

  clearInterval(intervalID);
  return game.score;
};

export const boot = async () => {
  while (true) {
    const game = new Tetris(15, 30);
    const renderer = new TerminalFrameRenderer(15);
    renderer.render(game.getState());
    const control = new Controls(game, renderer);
    
    await startGame(game, control, renderer);
    if (!game.state.isRestart) return game.score;
  }
};
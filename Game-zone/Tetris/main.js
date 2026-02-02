import { Tetris } from "./src/game.js";

const main = async () => {
  const game = new Tetris(15, 30);
  game.board.draw(game.piece);
  let pause = false;

  setInterval(() => pause ? '' : game.update(), 450);

  Deno.stdin.setRaw(true);
  for await (const chunk of Deno.stdin.readable) {
    const key = new TextDecoder().decode(chunk);

    if (key === "\u0003") Deno.exit();
    if (key === "\u001b[D") game.translate(-1, 0); // left
    if (key === "\u001b[C") game.translate(1, 0); // right
    if (key === "\u001b[B") game.translate(0, 1); // down
    if (key === "\u001b[A") game.rotatePiece(); // up => rotate
    if (key === "\u001b") pause = !pause; // Esc => pause/continue

    game.board.draw(game.piece);
  }
};

await main();
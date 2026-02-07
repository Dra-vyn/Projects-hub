export class Controls {
  constructor(game) {
    this.game = game;
    this.paused = false;
    this.operationsOnKeyPressed = {
      "\u001b[D": () => this.game.moveLeft(),
      "\u001b[C": () => this.game.moveRight(),
      "\u001b[B": () => this.game.softDrop(),
      "\u001b[A": () => this.game.rotate(),
    };

    this.otherControls = {
      "\u0003": () => Deno.exit(),
      "\u001b": () => this.togglePause(),
    };
  }

  async inputListener() {
    const decoder = new TextDecoder();
    Deno.stdin.setRaw(true);
    for await (const chunk of Deno.stdin.readable) {
      const key = decoder.decode(chunk);
      this.handleInput(key);
      if (!this.paused)
        this.game.board.draw(this.game.activePiece, this.game.nextPiece, this.game.score);
    }
  }

  handleInput(key) {
    if (key in this.otherControls) this.otherControls[key]();
    if (this.paused) return;
    if (key in this.operationsOnKeyPressed) {
      this.operationsOnKeyPressed[key]();
    }
  }

  togglePause() {
    this.paused = !this.paused;
    const msg = this.paused ? "Game PAUSED!" : "Game RESUMED";
    console.log(`%c${msg}`, "color : green");
  }
}

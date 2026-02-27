export class Controls {
  constructor(game, renderer) {
    this.game = game;
    this.renderer = renderer;
    this.decoder = new TextDecoder();
    this.init();
  }

  init() {
    this.keysPressed = {
      "\u001b[D": "leftArrow",
      "\u001b[C": "rightArrow",
      "\u001b[B": "downArrow",
      "\u001b[A": "upArrow",
      " ": "spaceBar",
      "\u0003": "ctrl + c",
      "q": "q",
      "r": "r",
      "\u001b": "esc",
    };

    this.movementControls = {
      "leftArrow": () => this.game.moveLeft(),
      "rightArrow": () => this.game.moveRight(),
      "downArrow": () => this.game.softDrop(),
      "upArrow": () => this.game.rotate(),
      "spaceBar": () => this.game.hardDrop(),
    };

    this.otherControls = {
      "q": () => this.game.exit(),
      "r": () => this.game.restart(),
      "esc": () => this.game.togglePause(),
    };
  }

  async listenInput() {
    const buffer = new Uint8Array(10);
    Deno.stdin.setRaw(true, { cbreak: true });

    while (!this.isQuit(this.game.state)) {
      const noOfBytesRead = await Deno.stdin.read(buffer);
      const key = this.decoder.decode(buffer.slice(0, noOfBytesRead));

      // if (this.isQuit(this.game.state)) return;
      this.handleInput(key);

      // this.game.board.draw(this.game);
      this.renderer.render(this.game.getState());
    }
  }

  isQuit({ isGameOver, isExit, isRestart}) {
    return isGameOver || isExit || isRestart;
  }

  handleInput(key) {
    if (!(key in this.keysPressed)) return;

    const keyInput = this.keysPressed[key];

    if (keyInput in this.otherControls) return this.otherControls[keyInput]();
    if (this.game.state.isPaused) return;

    this.movementControls[keyInput]();
  }
}

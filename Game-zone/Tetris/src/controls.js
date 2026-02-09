export class Controls {
  constructor(game) {
    this.game = game;
    this.paused = false;
    this.decoder = new TextDecoder();
    this.init();
  }

  init() {
    this.keysPressed = {
      "\u001b[D": 'leftArrow',
      "\u001b[C": 'rightArrow',
      "\u001b[B": 'downArrow',
      "\u001b[A": 'upArrow',
      ' ': 'spaceBar',
      "\u0003": 'ctrl + c',
      'q': 'q',
      "\u001b": 'esc'
    }

    this.movementControls = {
      'leftArrow': () => this.game.moveLeft(),
      'rightArrow': () => this.game.moveRight(),
      'downArrow': () => this.game.softDrop(),
      'upArrow': () => this.game.rotate(),
      'spaceBar': () => this.game.hardDrop(),
    };

    this.otherControls = {
      'ctrl + c': () => Deno.exit(),
      "q" : () => Deno.exit(),
      'esc': () => this.togglePause(),
    };
  }

  async inputListener() {
    Deno.stdin.setRaw(true);
    for await (const chunk of Deno.stdin.readable) {
      const key = this.decoder.decode(chunk);

      if (!(key in this.keysPressed)) return;
      this.handleInput(key);

      if (!this.paused) this.game.board.draw(this.game);
    }
  }

  handleInput(key) {
    const keyInput = this.keysPressed[key];

    if (keyInput in this.otherControls) return this.otherControls[keyInput]();
    if (this.paused) return;

    this.movementControls[keyInput]();
  }

  togglePause() {
    this.paused = !this.paused;
    if (this.paused) {
      console.log(`%cGame PAUSED!  Press ESC to Continue!`, "color : green");
    }
  }
}

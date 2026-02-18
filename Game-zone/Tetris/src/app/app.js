import { PageRenderer } from "./renderer.js";

export class App {
  constructor(initialPage, width, height) {
    this.currentPage = initialPage;
    this.decoder = new TextDecoder();
    this.buffer = new Uint8Array(5);
    this.format = new PageRenderer(width, height);

    this.keys = {
      "\u001B[B": "downArrow",
      "\u001B[A": "upArrow",
      "\r": "enter",
      "\u007F": "backspace",
    };
  }

  async run() {
    Deno.stdin.setRaw(true, { cbreak: true });

    while (true) {
      console.clear();

      const page = this.currentPage.render(this);

      console.log(page);

      const key = await this.readFromStdIn();

      const nextPage = await this.currentPage.update(key);

      if (nextPage) this.currentPage = nextPage;
    }
  }

  async readFromStdIn() {
    const n = await Deno.stdin.read(this.buffer);
    const key = this.decoder.decode(this.buffer.slice(0, n));
    return this.keys[key] || key;
  }
}

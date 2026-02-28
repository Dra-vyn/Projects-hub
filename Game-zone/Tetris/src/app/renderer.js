import {
  centerAlign,
  getCenterOffset,
  leftAlign,
  repeat,
  repeatLine,
  wrapWith,
} from "../utils/utils.js";

export class PageRenderer {
  constructor(width, height) {
    this.border = "🟫";
    this.pointer = "▶";
    this.empty = " ";
    this.width = width;
    this.pageHeight = height;

    this.init();
  }

  init() {
    this.contentWidth = this.width * 2;
    this.usableHeight = this.pageHeight - 2;

    this.frameLine = wrapWith(this.border, repeat(this.border, this.width));
    const emptyLine = repeat(this.empty, this.contentWidth);
    this.emptyLine = wrapWith(this.border, emptyLine);
  }

  menu({ title, index, options }) {
    const header = wrapWith(this.border, centerAlign(title, this.contentWidth));
    const content = options.map((option, i) => {
      const marker = i === index ? this.pointer : this.empty;
      const line = `    ${marker} ${option}`;
      return wrapWith(this.border, leftAlign(line, this.contentWidth));
    });

    return this.buildPage([header, this.emptyLine, this.emptyLine, ...content]);
  }

  buildPage(contentLines) {
    const { topPadLength, bottomPadLength } = this.getPageOffset(contentLines);

    return [
      this.frameLine,
      ...repeatLine(this.emptyLine, topPadLength),
      ...contentLines,
      ...repeatLine(this.emptyLine, bottomPadLength),
      this.frameLine,
    ].join("\n");
  }

  getPageOffset(content) {
    const topPadLength = getCenterOffset(this.usableHeight, content.length);
    const bottomPadLength = this.usableHeight - topPadLength - content.length;

    return { topPadLength, bottomPadLength };
  }

  form({ title, focus, username, password, error }) {
    const header = wrapWith(this.border, centerAlign(title, this.contentWidth));
    const pointer = focus === "username"
      ? { userName: this.pointer, pswd: this.empty }
      : { userName: this.empty, pswd: this.pointer };

    const usernameLine = `   ${pointer.userName} Username: ${username}`;
    const passwordLine = `   ${pointer.pswd} Password: ${
      repeat("*", password.length)
      }`;

    const lines = [
      header,
      this.emptyLine,
      this.emptyLine,
      wrapWith(this.border, leftAlign(usernameLine, this.contentWidth)),
      wrapWith(this.border, leftAlign(passwordLine, this.contentWidth)),
      this.emptyLine,
      this.emptyLine,
      wrapWith(this.border, centerAlign(error, this.contentWidth)),
    ];

    return this.buildPage(lines);
  }
}

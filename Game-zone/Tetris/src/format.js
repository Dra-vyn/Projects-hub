export class Formatter {
  constructor() {
    this.wall = "🟫";
    // this.border = "🔹";
    this.tLC = "┏━";
    this.tRC = "━┓";
    this.bLC = "┗━";
    this.bRC = "━┛";
    this.side = "┃";
    this.middle = "━━";
    this.title = "T E T R I S";
  }

  frameTetrisSpace(width, grid) {
    const title = this.frameHeader(width);
    const board = this.frameBoard(width, grid);
    return [...title, ...board].join("\n");
  }

  frameBoard(width, grid) {
    const hBorder = this.horizontalBorder(width);
    const rows = this.frameSideWall(grid);
    return [hBorder, ...rows, hBorder];
  }

  frameHeader(width) {
    const topBorder = this.getTopBorder(width);
    const middle = this.getMiddleBorder(width);
    const bottomBorder = this.getBottomBorder(width);
    return [topBorder, middle, bottomBorder];
  }

  getTopBorder(width) {
    return this.tLC + this.middle.repeat(width) + this.tRC;
  }

  getPadLengths(title, width) {
    return { leftPad: width + 1 + title.length / 2, rightPad: (width + 1) * 2 };
  }

  getPaddedTitle(width) {
    const { leftPad, rightPad } = this.getPadLengths(this.title, width);
    return this.title.padStart(leftPad).padEnd(rightPad);
  }

  getMiddleBorder(width) {
    return this.side + this.getPaddedTitle(width) + this.side;
  }

  getBottomBorder(width) {
    return this.bLC + this.middle.repeat(width) + this.bRC;
  }

  horizontalBorder(width) {
    return this.wall.repeat(width + 2);
  }

  frameSideWall(grid) {
    return grid.map((row) => this.frameRow(row));
  }

  frameRow(row) {
    const line = row.map((cell) => cell ? cell : "  ").join("");
    return this.wall.concat(line, this.wall);
  }
}

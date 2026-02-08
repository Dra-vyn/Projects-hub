export class Formatter {
  constructor() {
    this.wall = "🟫";
    this.border = "🔹";
    this.empty = "  ";
    this.title = "T E T R I S";

    this.corners = {
      top: { left: "┏━", right: "━┓" },
      bottom: { left: "┗━", right: "━┛" },
    };
    this.vertical = "┃";
    this.horizontal = "━━";
  }

  frameTetrisSpace(grid, hud) {
    const width = grid[0].length;
    const header = this.buildHeader(width)
    const boardLines = this.buildBoardLines(grid);
    const hudLines = this.buildHUD(hud);
    const border = this.buildBorder(this.border, width + 2);
    return [...header, border, ...hudLines, border, ...boardLines].join('\n');
  }

  buildBoardLines(grid) {
    const width = grid[0].length + 2;
    const boardLine = grid.map((row) =>
      this.wrapWith(this.renderRowCells(row), this.wall)
    );
    return [
      this.buildBorder(this.wall, width),
      ...boardLine,
      this.buildBorder(this.wall, width),
    ];
  }

  renderRowCells(row) {
    return row.map((cell) => cell || this.empty).join("");
  }

  wrapWith(content, wall) {
    return wall + content + wall;
  }

  buildHUD({ nextPiece, score }) {
    return [
      ...this.buildNextPieceLines(nextPiece),
      this.buildScoreLines(score),
    ];
  }

  buildBorder(border, count = 15) {
    return border.repeat(count);
  }

  buildNextPieceLines(nextPiece) {
    const nextPieceGrid = this.createNextPieceGrid(nextPiece);
    return [
      `UP NEXT : `,
      ...nextPieceGrid.map((row) => row.join("")),
    ];
  }

  createNextPieceGrid(piece) {
    const size = 3;
    const grid = Array.from(
      { length: size },
      () => Array(size).fill(this.empty),
    );

    piece.tetrimino.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell) grid[y][x] = piece.color;
      })
    );

    return grid;
  }

  buildScoreLines({ points, lines }) {
    return `Score : ${[points]}   Lines : ${lines}`;
  }

  buildHeader(width) {
    const totalWidth = (width + 1) * 2;
    const lengthToPad = Math.floor((totalWidth + this.title.length) / 2);
    const middleLine = this.title.padStart(lengthToPad).padEnd(totalWidth);
    return [
      this.buildTitleBorder(this.corners.top, width),
      this.wrapWith(middleLine, this.vertical),
      this.buildTitleBorder(this.corners.bottom, width),
    ];
  }

  buildTitleBorder({ left, right }, width) {
    return left + this.horizontal.repeat(width) + right;
  }
}

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
    const boardLines = this.buildBoardLines(grid);
    const hudLines = this.buildHUD(hud);
    return this.combineWith(boardLines, hudLines, width);
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
      this.buildBorder(this.border),
      ...this.buildNextPieceLines(nextPiece),
      ...this.buildScoreLines(score),
      this.buildBorder(this.border),
    ];
  }

  buildBorder(border, count = 15) {
    return border.repeat(count);
  }

  buildNextPieceLines(nextPiece) {
    const nextPieceGrid = this.createNextPieceGrid(nextPiece);
    return [
      ` 𝐔 𝐏 𝐍 𝐄 𝐗 𝐓 : `,
      "",
      ...nextPieceGrid.map((row) => row.join("")),
    ];
  }

  createNextPieceGrid(piece) {
    const size = 4;
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
    return [
      this.separator(),
      `🔰 𝑺 𝑪 𝑶 𝑹 𝑬 : ${points} 🏆`,
      this.separator(),
      `✮ 𝑳 𝑰 𝑵 𝑬 𝑺 : ${lines}`,
      "",
    ];
  }

  separator() {
    return this.horizontal.repeat(15);
  }

  combineWith(boardLines, hudLines, width) {
    const header = this.buildHeader(width);
    const lines = [];

    for (let i = 0; i < boardLines.length; i++) {
      const boardLine = boardLines[i];
      const hudLine = hudLines[i] || "";
      lines.push(boardLine + "  " + hudLine);
    }

    return [header, ...lines].join("\n");
  }

  buildHeader(width) {
    const totalWidth = (width + 1) * 2;
    const lengthToPad = Math.floor((totalWidth + this.title.length) / 2);
    const middleLine = this.title.padStart(lengthToPad).padEnd(totalWidth);
    return [
      this.buildTitleBorder(this.corners.top, width),
      this.wrapWith(middleLine, this.vertical),
      this.buildTitleBorder(this.corners.bottom, width),
    ].join("\n");
  }

  buildTitleBorder({ left, right }, width) {
    return left + this.horizontal.repeat(width) + right;
  }
}
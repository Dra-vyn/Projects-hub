export class Formatter {
  constructor() {
    this.wall = "🟫";
    this.border = "🟦";
    this.empty = "  ";
    this.title = "T E T R I S";
    this.HUDWidth = 15;
    this.maxHeight = 4;
    this.instructions = [
      `  ⬅   : MOVE LEFT`,
      `  ➡   : MOVE RIGHT`,
      `  ⬇   : SOFT DROP`,
      `  ⬆   : ROTATE PIECE`,
      ` SPACE : HARD DROP`,
      '',
      `  ESC : PAUSE / CONTINUE`,
      `  CTRL + c : EXIT`,
    ];

    this.init();
  }
  
  init() {
    this.innerHUDWidth = this.HUDWidth * 2 - 4;
    this.defaultHUDLine = this.HUDBorder(this.centerText(""));
  }

  frameTetrisSpace(grid, game) {
    const width = grid[0].length;
    const boardLines = this.buildBoardLines(grid);
    const hudLines = this.buildHUD(game);
    return this.combineWith(boardLines, hudLines, width);
  }

  buildBoardLines(grid) {
    const width = grid[0].length + 2;
    const boardLine = grid.map((row) =>
      this.wrapWith(this.renderRowCells(row), this.wall, this.border)
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

  wrapWith(content, wall, border) {
    return border + wall + content + wall + border;
  }

  buildHUD({ nextPiece, score }) {
    return [
      this.separator(),
      ...this.buildScoreLines(score),
      this.defaultHUDLine,
      ...this.buildNextPieceLines(nextPiece),
      this.separator(),
      this.defaultHUDLine,
      ...this.buildInstructions(),
    ];
  }

  buildInstructions() {
    return this.instructions.map(row =>
      this.HUDBorder(row.padEnd(this.innerHUDWidth)));
  }

  buildBorder(border, count = 15) {
    return this.border + border.repeat(count) + this.border;
  }

  buildNextPieceLines(nextPiece) {
    const nextPieceGrid = this.createNextPieceGrid(nextPiece);
    const next = 'NEXT : ';
    return [
      this.HUDBorder(this.centerText(next)),
      this.defaultHUDLine,
      ...nextPieceGrid.map((row) => this.HUDBorder(row.join(""))),
    ];
  }

  createNextPieceGrid(piece) {
    const grid = Array.from(
      { length: this.maxHeight },
      () => Array(this.innerHUDWidth/2).fill(this.empty),
    );

    piece.tetrimino.forEach((row, y) => 
      row.forEach((cell, x) => {
        if (cell) grid[y][x + 4] = piece.color;
      })
    );

    return grid;
  }

  buildScoreLines({ points, lines, level }) {
    const score = `SCORE : ${points}`;
    const line = `LINES : ${lines}`;
    const lvl = `LEVEL : ${level}`;
    return [
      this.defaultHUDLine,
      this.HUDBorder(this.centerText(score)),
      this.HUDBorder(this.centerText(line)),
      this.HUDBorder(this.centerText(lvl)),
      this.defaultHUDLine,
      this.separator(),
    ];
  }

  HUDBorder(content) {
    return content + this.border.repeat(2);
  }

  separator() {
    return this.border.repeat(this.HUDWidth);
  }

  combineWith(boardLines, hudLines, width) {
    const header = this.buildHeader(width);
    const lines = [];

    for (let i = 0; i < boardLines.length; i++) {
      const boardLine = boardLines[i];
      const hudLine = hudLines[i] || this.defaultHUDLine;
      if (i === boardLines.length - 1) {
        lines.push(boardLine + this.separator());
        break;
      }

      lines.push(boardLine + hudLine);
    }

    return [header, ...lines, this.buildTitleBorder(width)].join("\n");
  }

  buildHeader(width) {
    const totalWidth = width * 4;
    const middleLine = this.centerText(this.title, totalWidth);
    return [
      this.buildTitleBorder(width),
      this.wrapWith(middleLine, this.border, this.border),
      this.buildTitleBorder(width),
    ].join("\n");
  }

  buildTitleBorder(width) {
    return this.border.repeat(width + 4 + this.HUDWidth);
  }

  centerText(text, totalWidth = this.innerHUDWidth) {
    const lengthToPad = Math.floor((totalWidth + text.length) / 2);
    return text.padStart(lengthToPad).padEnd(totalWidth);
  }
}
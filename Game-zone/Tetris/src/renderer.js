import {
  centerAlign,
  createGrid,
  getCenterOffset,
  leftAlign,
  repeat,
  setMatrix,
  wrapWith,
} from "./utils.js";

export class FrameRenderer {
  constructor(width) {
    this.boardWidth = width;
    this.wall = "🟫";
    this.edge = "🟦";
    this.empty = "  ";
    this.init();
  }

  init() {
    this.width = this.setLayoutWidths();
    this.layout = this.setLayoutLines();
  }

  setLayoutWidths() {
    const framedBoardWidth = this.boardWidth + 2;
    const HUDInnerWidth = this.boardWidth - 2;
    return {
      framedBoardWidth,
      HUDInnerWidth,
      labelWidth: this.boardWidth * 4,
      frameWidth: framedBoardWidth * 2,
      HUDRendererWidth: HUDInnerWidth * 2,
    };
  }

  setLayoutLines() {
    const { frameWidth, HUDInnerWidth } = this.width;

    return {
      frameLine: repeat(this.edge, frameWidth),
      boundary: repeat(this.wall, this.boardWidth),
      separatorLine: repeat(this.edge, HUDInnerWidth),
      emptyLine: repeat(this.empty, HUDInnerWidth),
    };
  }

  render(grid, game) {
    const boardLines = this.renderBoard(grid);
    const HUDLines = this.renderHUD(game);

    return this.combineWith(boardLines, HUDLines, game.title);
  }

  renderBoard(grid) {
    const boardLines = this.boardLines(grid);
    const boundary = repeat(this.wall, this.width.framedBoardWidth);

    return [boundary, ...boardLines, boundary];
  }

  boardLines(grid) {
    const mapper = (row) => wrapWith(this.wall, this.renderCells(row));

    return grid.map(mapper);
  }

  renderCells(row) {
    return row.map((cell) => cell || this.empty).join("");
  }

  renderHUD({ score, nextPiece, instructions, maxPieceHeight }) {
    const { separatorLine } = this.layout;
    return [
      separatorLine,
      ...this.gameStats(score),
      separatorLine,
      ...this.renderNextPiece(nextPiece, maxPieceHeight),
      separatorLine,
      ...this.controlsGuide(instructions),
    ];
  }

  gameStats({ points, lines, level }) {
    const stats = [`SCORE : ${points}`, `LINES : ${lines}`, `LEVEL : ${level}`];
    const width = this.width.HUDRendererWidth;
    const scoreLines = stats.map((stat) => centerAlign(stat, width));
    const { emptyLine } = this.layout;

    return [emptyLine, ...scoreLines, emptyLine];
  }

  renderNextPiece(nextPiece, height) {
    const next = "NEXT : ";
    const grid = this.nextPieceGrid(nextPiece, height);
    const nextPieceLines = grid.map((row) => row.join(""));
    const { emptyLine } = this.layout;

    return [
      emptyLine,
      centerAlign(next, this.width.HUDRendererWidth),
      emptyLine,
      ...nextPieceLines,
      emptyLine,
    ];
  }

  nextPieceGrid(piece, height) {
    const { HUDInnerWidth } = this.width;

    const grid = createGrid(height, HUDInnerWidth, this.empty);
    const length = piece.tetrimino[0].length;
    const xOffset = getCenterOffset(HUDInnerWidth, length);

    piece.tetrimino.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell) setMatrix(grid, y, x + xOffset, piece.color);
      })
    );

    return grid;
  }

  controlsGuide(instructions) {
    const width = this.width.HUDRendererWidth;
    const guide = instructions.map((row) => leftAlign(row, width));

    return [this.layout.emptyLine, ...guide];
  }

  renderTitle(title) {
    const label = centerAlign(title, this.width.labelWidth);
    const formattedLabel = wrapWith(this.edge, label);
    const { frameLine } = this.layout;

    return [frameLine, wrapWith(this.edge, formattedLabel), frameLine];
  }

  combineWith(boardLines, HUDLines, title) {
    const combined = this.combinedLines(boardLines, HUDLines);
    
    return [
      ...this.renderTitle(title),
      ...combined,
      this.layout.frameLine
    ].join("\n");
  }

  combinedLines(boardLines, HUDLines) {
    const { emptyLine, separatorLine } = this.layout;
    const lines = [];

    for (let i = 0; i < boardLines.length - 1; i++) {
      const boardLine = boardLines[i];
      const HUDLine = HUDLines[i] || emptyLine;
      lines.push(this.wrapRow(boardLine, HUDLine));
    }
    
    const boardLine = boardLines.at(-1);
    lines.push(this.wrapRow(boardLine, separatorLine));

    return lines;
  }

  wrapRow(boardLine, HUDLine) {
    const HUDLines = wrapWith(this.edge, HUDLine);
    const combined = boardLine + HUDLines;
    return wrapWith(this.edge, combined);
  }
}

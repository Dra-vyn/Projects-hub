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
    this.horizontal = "━";
  }

  frameTetrisSpace(width, grid, hud) {
    const layoutMetrics = this.computeLayout(width);
    return [
      ...this.header(layoutMetrics),
      ...this.hud(layoutMetrics, hud),
      ...this.renderBoard(grid, layoutMetrics),
    ].join("\n");
  }

  computeLayout(playFieldWidth) {
    const cellWidth = 2;
    const titleWallWidth = this.vertical.length;
    const contentWidth = playFieldWidth * cellWidth;
    return {
      playFieldWidth,
      titleWallWidth,
      contentWidth,
      titleInnerWidth: contentWidth + titleWallWidth,
      frameWidth: contentWidth + 2 * cellWidth,
    };
  }

  header(layoutMetrics) {
    const top = this.renderBorder(this.corners.top, layoutMetrics);
    const centeredText = this.centerText(this.title, layoutMetrics);
    const middle = this.frameWith(this.vertical, centeredText, this.vertical);
    const bottom = this.renderBorder(this.corners.bottom, layoutMetrics);
    return [top, middle, bottom];
  }

  hud({ frameWidth }, { nextPiece, score }) {
    const wallBorder = this.border.repeat(frameWidth / 2);
    const piece = this.renderNextPiece(nextPiece);
    const scores = this.renderScore(score)
    return [wallBorder,piece, scores, wallBorder]
  }

  renderScore({ points, lines }) {
    return `Score : ${points}   lines Cleared : ${lines}`
  }

  renderNextPiece(piece) {
    const nextPiece = piece.tetrimino
      .map(row => row.map(cell => cell ? piece.color : '  ').join('')).join('\n');

    return `Next Piece :\n${nextPiece}`;
  }

  renderBorder({ left, right }, { contentWidth }) {
    return left + this.horizontal.repeat(contentWidth) + right;
  }

  frameWith(left, content, right) {
    return left + content + right;
  }

  centerText(text, { titleInnerWidth, frameWidth }) {
    return text
      .padStart((titleInnerWidth + text.length) / 2)
      .padEnd(frameWidth - 2);
  }

  renderBoard(grid, { frameWidth }) {
    const wallBorder = this.wall.repeat(frameWidth / 2);
    return [
      wallBorder,
      ...grid.map((row) => this.renderBoardRow(row)),
      wallBorder,
    ];
  }

  renderBoardRow(row) {
    const content = row.map((cell) => cell || this.empty).join("");
    return this.frameWith(this.wall, content, this.wall);
  }
}

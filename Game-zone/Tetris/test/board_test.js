import { assertEquals } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { Board } from "../src/game/board.js";
import { Piece } from "../src/game/piece.js";

describe("BOARD", () => {
  let board;

  beforeEach(() => {
    board = new Board(3, 1);
  });

  it("should create a new board", () => {
    const expected = [[0, 0, 0]];
    assertEquals(board.createBoard(), expected);
  });

  it("should create a temporary Board", () => {
    const expected = [[0, 0, 0]];
    assertEquals(board.createTempBoard(), expected);
  });

  it("should draw piece on the board", () => {
    const block = { tetrimino: [[1]], color: "🟦", x: 1, y: 0 };
    board.drawPieceOn(board.grid, block);
    assertEquals(board.grid, [[0, "🟦", 0]]);
  });

  it("should lock piece on the grid", () => {
    const piece = new Piece({ tetrimino: [[1]], color: "🟦", x: 1, y: 0 });
    board.lockPiece(piece);
    assertEquals(board.grid, [[0, "🟦", 0]]);
  });

  it("should clear filled lines", () => {
    board.grid[0] = [1, 1, 1];
    assertEquals(board.clearLines(), 1);
    assertEquals(board.grid, [[0, 0, 0]]);
  });

  it("should return empty array when there is no unfilled rows", () => {
    board.grid[0] = [1, 1, 1];
    assertEquals(board.getUnfilledRows(), []);
  });

  it("should return unfilled rows", () =>
    assertEquals(board.getUnfilledRows(), [[0, 0, 0]]));

  it('Should return true as (1, 0) is inside of the board', () =>
    assertEquals(board.isInside(1, 0), true));

  it('Should return false as (5, 0) is inside of the board', () =>
    assertEquals(board.isInside(5, 0), false));

  it('Should return false if the cell is not occupied or not out of bounds', () =>
    assertEquals(board.isCellOccupied(1, 0), false));

  it('Should return true if the cell is out of bounds', () =>
    assertEquals(board.isCellOccupied(5, 0), true));

  it('Should return true if the cell is occupied', () => {
    board.grid[0][1] = 1;
    assertEquals(board.isCellOccupied(1, 0), true)
  });

  it('Should return true if the piece is colliding with another piece', () => {
    board.grid[0][1] = 1;
    const block = { tetrimino : [[1]], x : 1, y : 0}
    assertEquals(board.isPieceColliding(block), true);
  });

  it('Should return false if the piece is not colliding with another piece', () => {
    const block = { tetrimino : [[1]], x : 1, y : 0}
    assertEquals(board.isPieceColliding(block), false);
  });

  it('should render piece on the board', () => {
    const piece = new Piece({ tetrimino: [[1]], color: "🟦", x: 1, y: 0 });
    assertEquals(board.render(piece), [[0, '🟦', 0]]);
  })
});

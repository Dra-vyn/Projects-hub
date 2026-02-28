import { assertEquals } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { Piece } from "../src/game/piece.js";

describe("PIECE", () => {
  let piece;

  beforeEach(() => {
    const block = { tetrimino: [[1, 1]], color: "🟦", x: 1, y: 2 };
    piece = new Piece(block);
  });

  it("Should return new moved Piece", () => {
    const actual = piece.moved(0, 1);
    const expected = new Piece({
      tetrimino: [[1, 1]],
      color: "🟦",
      x: 1,
      y: 3,
    });
    assertEquals(actual, expected);
  });

  it("Should return new rotated Piece", () => {
    const actual = piece.rotate();
    const expected = new Piece({
      tetrimino: [[1], [1]],
      color: "🟦",
      x: 1,
      y: 2,
    });
    assertEquals(actual, expected);
  });
});

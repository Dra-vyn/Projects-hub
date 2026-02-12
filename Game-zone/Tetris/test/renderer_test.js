import { assertEquals } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { FrameRenderer } from "../src/renderer.js";
import { Tetris } from "../src/game.js";

describe(` FRAME RENDERER`, () => {
  const grid = [['hello', 'hello']];
  const game = new Tetris(5, 10);
  let render;
  beforeEach(() => {
    render = new FrameRenderer(5);
  });

  it(`should render board`, () =>
    assertEquals(render.renderBoard(grid, game),
      ["🟫🟫🟫🟫🟫🟫🟫", "🟫hellohello🟫", "🟫🟫🟫🟫🟫🟫🟫"]));
  
  it(`should render boardLines`, () =>
    assertEquals(render.boardLines(grid), ["🟫hellohello🟫"]));
  
  it(`should render cells`, () =>
    assertEquals(render.renderCells(grid[0]), "hellohello"));
  
  it(`should not render overlay if state is not paused`, () => {
    const args = { state: { isPaused: false, isGameOver: false } };
    assertEquals(render.renderOverlay(grid, args), grid)
  });
  
  it(`should render overlay if the state is paused`, () => {
    const args = { state: { isPaused: true, isGameOver: false }, overlayText: { 'paused': 'game paused' } };
    assertEquals(render.renderOverlay(grid, args), ["🟫game paused🟫"])
  });
  
  it(`should render overlay if the state is game over`, () => {
    const args = { state: { isPaused: false, isGameOver: true }, overlayText: { 'gameOver': 'game over' } };
    assertEquals(render.renderOverlay(grid, args), ["🟫game over🟫"]);
  });
  
})
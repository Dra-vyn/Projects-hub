import { assertEquals } from "@std/assert";
import {
  centerAlign,
  createGrid,
  getCenterOffset,
  isBetween,
  leftAlign,
  midPoint,
  repeat,
  repeatLine,
  rotateRight,
  setMatrix,
  wrapWith,
} from "../src/utils/utils.js";

Deno.test(`▶ Should transpose the given array`, () =>
  assertEquals(rotateRight([[1, 2, 3], [4, 5, 6]]), [[4, 1], [5, 2], [6, 3]]));

Deno.test(`▶ Should return center offset value`, () =>
  assertEquals(getCenterOffset(20, 5), 7));

Deno.test(`▶ Should set a value in the matrix according to the specified position`, () =>
  assertEquals(setMatrix([[0, 0, 0], [0, 0, 0]], 1, 1, 5), [[0, 0, 0], [
    0,
    5,
    0,
  ]]));

Deno.test(`▶ Should return true if the value is in between the given limit`, () =>
  assertEquals(isBetween(3, 5), true));

Deno.test(`▶ Should return false if the value is not between the given limit`, () =>
  assertEquals(isBetween(7, 5), false));

Deno.test(`▶ Should return the mid point provided 2 params`, () =>
  assertEquals(midPoint(7, 5), 6));

Deno.test(`▶ Should return the mid point provided 1 parameter`, () =>
  assertEquals(midPoint(4), 2));

Deno.test(`▶ Should return a 2D array of given dimensions`, () =>
  assertEquals(createGrid(2, 2, " "), [[" ", " "], [" ", " "]]));

Deno.test(`▶ Should align the text to the left end`, () =>
  assertEquals(leftAlign("hello", 10), "hello     "));

Deno.test(`▶ Should align the text to the center`, () =>
  assertEquals(centerAlign("hello", 11), "   hello   "));

Deno.test(`▶ Should repeat the character according to the given length`, () =>
  assertEquals(repeat("Aa", 3), "AaAaAa"));

Deno.test(`▶ Should wrap the content with a specified char`, () =>
  assertEquals(wrapWith("Aa", "bb"), "AabbAa"));

Deno.test(`▶ Should repeat the same line according to the count`, () =>
  assertEquals(repeatLine([1, 0, 1], 2), [[1, 0, 1], [1, 0, 1]]));
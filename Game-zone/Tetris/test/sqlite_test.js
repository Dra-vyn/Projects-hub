import { assertEquals } from "@std/assert";
import { describe, it, beforeEach } from "@std/testing/bdd";
import { Stats } from "../src/inquirer_interface/sqlite.js";
import { QUERY } from "../src/inquirer_interface/queries.js";

describe("▶ INITIALIZE TABLE IN SQLITE", () => {
  let database;
  beforeEach(() => {
    database = new Stats(':memory:');
  });

  it("  ⏺ init GAME STATS TABLE", () => {
    database.initTables();
    const tables = database.db.prepare(QUERY.getTables).all('gameStats');
    assertEquals(tables, [{ name: 'gameStats' }]);
    assertEquals(tables.length, 1);
  });
});

describe("▶ ADD PLAYER STATS IN SQLITE", () => {
  let database;
  beforeEach(() => {
    database = new Stats(':memory:');
    database.initTables();
  });

  it("  ⏺ add a new Player Stat directly", () => {
    const input = ['A', 1, 12, 0];
    database.addStats(input);
    const actual = database.listStats();
    const expected = [{ player_id: 1, player_name: 'A', level: 1, score: 12, lines_cleared: 0 }];
    assertEquals(actual, expected);
  });
});

describe("▶ LIST PLAYER STATS IN SQLITE", () => {
  let database;
  beforeEach(() => {
    database = new Stats(':memory:');
    database.initTables();
  });

  it("  ⏺ lists all available Stats", () => {
    database.addStats(['A', 1, 12, 0]);
    assertEquals(database.listStats(),
      [{ player_id: 1, player_name: 'A', level: 1, score: 12, lines_cleared : 0 }]);
  });
});

describe("▶ LIST PLAYER STATS IN SQLITE", () => {
  let database;
  beforeEach(() => {
    database = new Stats(':memory:');
    database.initTables();
  });

  it("  ⏺ lists all available Stats", () => {
    database.addStats(['A', 1, 12, 0]);
    assertEquals(database.listStats(),
      [{ player_id: 1, player_name: 'A', level: 1, score: 12, lines_cleared : 0 }]);
  });
});
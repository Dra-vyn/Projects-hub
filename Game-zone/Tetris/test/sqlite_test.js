import { assertEquals } from "@std/assert";
import { describe, it, beforeEach } from "@std/testing/bdd";
import { Stats } from "../src/database/sqlite.js";
import { QUERY } from "../src/database/queries.js";

describe('INITIALIZE TABLES', () => {
  let database;

  beforeEach(() => {
    database = new Stats(':memory:');
  });

  it('Initialize player info and game stats table', () => {
    database.initTables();
    const tables = database.db.prepare(QUERY.getTables).all('playersInfo', 'gameStats');
    assertEquals(tables, [{ name: 'playersInfo' }, { name: 'gameStats' }]);
    assertEquals(tables.length, 2);
  });

  it('When player info and game stats table is already initialised', () => {
    database.initTables();
    database.initTables();
    const tables = database.db.prepare(QUERY.getTables).all('playersInfo', 'gameStats');
    assertEquals(tables, [{ name: 'playersInfo' }, { name: 'gameStats' }]);
    assertEquals(tables.length, 2);
  });

});

describe('ADD & LIST OPERATIONS IN TABLES', () => {
  let database;

  beforeEach(() => {
    database = new Stats(':memory:');
    database.initTables();
  });

  it('add username and password to the playersInfo table', () =>
    assertEquals(database.addPlayerInfo('Player1', '1234'), 1));

  it('add gameStats of a player to the table game stats', () => {
    const playerId = database.addPlayerInfo('Player1', 1234);
    assertEquals(database.addGameStats(playerId, 100, 2), 1);
  });

  it('list high scores of all time', () => {
    const playerId = database.addPlayerInfo('Player1', 1234);
    database.addGameStats(playerId, 100, 2)
    assertEquals(database.listHighScores(),
      [{ 'user_name': 'Player1', score: 100 }])
  });

  it('list all time stats of the current player', () => {
    const playerId = database.addPlayerInfo('Player1', 1234);
    database.addGameStats(playerId, 100, 2)
    assertEquals(database.listAllStats(playerId),
      { games_played: 1, max_score: 100, total_lines: 2 })
  });

  it('should return a player id with the username and password', () => {
    const player_id = database.addPlayerInfo('Player1', 1234);
    assertEquals(database.getPlayerId('Player1', 1234), { player_id })
  });

  it('should return undefined if the username is not present', () => {
    database.addPlayerInfo('Player1', 1234);
    assertEquals(database.getPlayerId('Player2', 1234), undefined)
  });

  it('should return undefined if the password of a username is invalid', () => {
    database.addPlayerInfo('Player1', 1234);
    assertEquals(database.getPlayerId('Player1', 1245), undefined)
  });

  it('should return undefined if both are invalid', () => {
    database.addPlayerInfo('Player1', 1234);
    assertEquals(database.getPlayerId('Player2', 1245), undefined)
  });

  it('should return username', () => {
    database.addPlayerInfo('Player1', 1234);
    assertEquals(database.getUsername('Player1'), { user_name: 'Player1' });
  });

  it('should return undefined if the username is not found', () => {
    database.addPlayerInfo('Player1', 1234);
    assertEquals(database.getUsername('Player2'), undefined);
  });

})
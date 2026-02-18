export const QUERY = {
  createPlayerDetails: `CREATE TABLE IF NOT EXISTS playersInfo (
      player_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_name TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
      ) STRICT;`,
  createGameStats: `CREATE TABLE IF NOT EXISTS gameStats (
      game_id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_id INTEGER REFERENCES playersInfo(player_id) ON DELETE CASCADE,
      score INTEGER NOT NULL,
      lines_cleared INTEGER NOT NULL
      ) STRICT;`,
  getTables: `SELECT name FROM sqlite_master 
      WHERE type = 'table' AND name = ? OR name = ?`,
  insertPlayerDetails: `INSERT INTO playersInfo (user_name, password) 
      VALUES (?, ?);`,
  insertGameStats: `INSERT INTO gameStats (player_id, score, lines_cleared) 
      VALUES (?, ?, ?);`,
  listHighScores: `SELECT user_name, score FROM playersInfo
      INNER JOIN gameStats
      ON playersInfo.player_id = gameStats.player_id
      ORDER BY score DESC
      LIMIT 5;`,
  listAllStats: `SELECT MAX(score) as max_score, COUNT(score) as games_played, SUM(lines_cleared) as total FROM gameStats
      WHERE player_id = ?;`,
    getUsername: `SELECT user_name FROM playersInfo WHERE user_name = ?;`,
    getPlayerId: `SELECT player_id FROM playersInfo 
      WHERE user_name = ? AND password = ?;`,
};

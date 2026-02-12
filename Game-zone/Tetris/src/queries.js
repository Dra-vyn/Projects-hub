export const QUERY = {
  create: `CREATE TABLE IF NOT EXISTS gameStats (
      player_id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_name TEXT NOT NULL,
      level INTEGER NOT NULL,
      score INTEGER NOT NULL,
      lines_cleared INTEGER NOT NULL
      ) STRICT;`,
  getTables: `SELECT name FROM sqlite_master 
      WHERE type = 'table' AND name = ? OR name = ?`,
  insert: `INSERT INTO gameStats (player_name, level, score, lines_cleared) 
      VALUES (?, ?, ?, ?);`,
  list: `SELECT * FROM gameStats;`,
  topScorers: `SELECT player_name, score FROM gameStats 
      ORDER BY score DESC 
      LIMIT 5;`,
  levelLeaders: `SELECT player_name, level FROM gameStats
      ORDER BY level DESC
      LIMIT 5;`,
  topLinesCleared: `SELECT player_name, lines_cleared FROM gameStats
      Order BY lines_cleared DESC
      LIMIT 5;`
};

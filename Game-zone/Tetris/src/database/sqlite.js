import { DatabaseSync } from "node:sqlite";
import { QUERY } from "./queries.js";

export class Stats {
  constructor(path) {
    this.db = new DatabaseSync(path);
  }

  initTables() {
    this.db.exec(QUERY.createPlayerDetails);
    this.db.exec(QUERY.createGameStats);
    this.prepare();
  }

  prepare() {
    this.insertPlayerData = this.db.prepare(QUERY.insertPlayerDetails);
    this.insertGameStats = this.db.prepare(QUERY.insertGameStats);
    this.highScoresList = this.db.prepare(QUERY.listHighScores);
    this.allStatsList = this.db.prepare(QUERY.listAllStats);
    this.user = this.db.prepare(QUERY.getPlayerId);
    this.username = this.db.prepare(QUERY.getUsername)
  }

  addPlayerInfo(username, password) {
    const { lastInsertRowid } = this.insertPlayerData.run(username, password);
    return lastInsertRowid;
  }

  addGameStats(playerId, score, lines) {
    const { lastInsertRowid } = this.insertGameStats.run(playerId, score, lines);
    
    return lastInsertRowid;
  }

  listHighScores() {
    return this.highScoresList.all();
  }

  listAllStats(playerId) {
    return this.allStatsList.get(playerId);
  }

  getPlayerId(username, password) {
    return this.user.get(username, password);
  }

  getUsername(username) {
    return this.username.get(username);
  }
}
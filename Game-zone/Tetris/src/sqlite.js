import { DatabaseSync } from "node:sqlite";
import { QUERY } from "./queries.js";

export class Stats {
  constructor(path) {
    this.db = new DatabaseSync(path);
  }

  initTables() {
    this.db.exec(QUERY.create);
    this.prepare();
  }

  prepare() {
    this.insert = this.db.prepare(QUERY.insert);
    this.list = this.db.prepare(QUERY.list);
    this.topScorers = this.db.prepare(QUERY.topScorers);
    this.levelLeaders = this.db.prepare(QUERY.levelLeaders);
    this.topLinesCleared = this.db.prepare(QUERY.topLinesCleared);
  }

  addStats(details) {
    this.insert.run(...details);
  }

  listStats() {
    return this.list.all()
  }

  listTopScorers() {
    return this.topScorers.all();
  }

  listLevelLeaders() {
    return this.levelLeaders.all();
  }

  listTopLines() {
    return this.topLinesCleared.all();
  }
}

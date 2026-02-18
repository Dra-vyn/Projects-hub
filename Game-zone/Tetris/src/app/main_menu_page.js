import { boot } from "../boot.js";
import { listAllStats, listHighScores } from "./other_pages.js";
import { POINTER_KEYS } from "./utils.js";

export class MainMenuPage {
  constructor(title, { playerId, username, password, database }) {
    this.title = title;
    this.options = ["START GAME", "HIGH SCORES", "ALL TIME STATS", "EXIT"];
    this.index = 0;
    this.username = username;
    this.password = password;
    this.database = database;
    this.playerId = playerId;

    this.operations = {
      "START GAME": () => boot(),
      "HIGH SCORES": () => listHighScores(database),
      "ALL TIME STATS": () => listAllStats(database, this.playerId),
    }
  }

  render(app) {
    return app.format.menu(this);
  }

  async update(key) {
    if (key in POINTER_KEYS) this.index = POINTER_KEYS[key](this);

    if (key === 'enter') {
      const choice = this.options[this.index];

      if (choice === "EXIT") Deno.exit();

      const data = await this.operations[choice]();

      if (choice === "START GAME") {
        const { points, lines } = data;
        this.database.addGameStats(this.playerId, points, lines);
      }

      return;
    }
  }
}
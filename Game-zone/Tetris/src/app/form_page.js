import { MainMenuPage } from "./main_menu_page.js";
import { POINTER_KEYS } from "./utils.js";
import { Stats } from "../database/sqlite.js";

export class FormPage {
  constructor(title) {
    this.options = ["username", "password"];
    this.index = 0;
    this.title = title;
    this.username = "";
    this.password = "";
    this.error = "";
    this.focus = "username";

    this.errorMsgs = {
      "empty": (name) => ` ${name} cannot be Empty!`,
      "lessThan": (name) => ` ${name} length must be > 6`,
      "invalid": (name) => ` Invalid ${name}`,
    };

    this.init();
  }

  init() {
    this.database = new Stats("tetris.db");
    this.database.initTables();
  }

  render(app) {
    return app.format.form(this);
  }

  update(key) {
    if (key in POINTER_KEYS) {
      this.index = POINTER_KEYS[key](this);
      this.focus = this.options[this.index];
      return;
    }
    
    if (key === "backspace") {
      this[this.focus] = this[this.focus].slice(0, -1);
      return;
    }
    
    if (key === "enter") {
      if (this.validate() && this.verifyUser()) {
        return new MainMenuPage("MAIN MENU", this);
      }
    }
    
    if (key.match(/^[A-Za-z0-9]$/g) && this[this.focus].length <= 12) {
      this[this.focus] += key;
    }
    
    return;
  }

  validate() {
    if (!this.username || !this.password) {
      const name = !this.username ? "username" : "password";
      this.error = this.errorMsgs["empty"](name);
      return false;
    }

    if (this.username.length < 6 || this.password.length < 6) {
      const name = this.username.length < 6 ? "username" : "password";
      this.error = this.errorMsgs["lessThan"](name);
      return false;
    }

    return true;
  }

  verifyUser() {
    return this.title === 'SIGN UP' ? this.signUp() : this.login();
  }

  signUp() {
    const username = this.database.getUsername(this.username);

    if (username) {
      this.error = `${this.username}  Username already Exists`;
      return false;
    }
    
    this.playerId = this.database.addPlayerInfo(this.username, this.password);

    return true;
  }

  login() {
    const player = this.database.getPlayerId(this.username, this.password);

    if (!player) {
      this.error = `Invalid credentials`;
      return false;
    }

    this.playerId = player.player_id;

    return true;
  }
}

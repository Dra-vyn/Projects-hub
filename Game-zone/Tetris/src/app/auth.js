import { FormPage } from "./form_page.js";
import { POINTER_KEYS } from "./utils.js";

export class AuthorizationPage {
  constructor() {
    this.options = ["SIGN UP", "LOGIN", "EXIT"];
    this.index = 0;
    this.title = 'T E T R I S';
  }

  render(app) {
    return app.format.menu(this);
  }

  update(key) {
    if (key in POINTER_KEYS) this.index = POINTER_KEYS[key](this);

    if (key === 'enter') {
      const choice = this.options[this.index];

      if (choice === "EXIT") Deno.exit();

      return new FormPage(choice);
    }
  }
}
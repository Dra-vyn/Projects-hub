import { App } from "./app.js";
import { AuthorizationPage } from "./auth.js";

export const launchApp = async () => {
  const width = 16;
  const height = 24;
  const screen = new AuthorizationPage();
  const app = new App(screen, width, height);
  return await app.run();
};

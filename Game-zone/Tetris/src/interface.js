import { boot } from "./boot.js";
import { Stats } from "./sqlite.js";
import {
  inputConfig,
  launchAppConfig,
  listConfig,
  mainMenuConfig,
} from "./config.js";

const list = async (stats, choice, selectHandler) => {
  console.table(stats[choice]());

  return await selectHandler(listConfig());
};

const saveStats = (stats, player, { points, level, lines }) => {
  const details = [player, level, points, lines];

  return stats.addStats(details);
};

const playGame = async (stats, player) => {
  const result = await boot();
  if (result) saveStats(stats, player, result);
};

const mainMenu = async (stats, selectHandler, player) => {
  while (true) {
    console.clear();
    const choice = await selectHandler(mainMenuConfig());
    if (choice === "exit") return;

    choice === "playGame"
      ? await playGame(stats, player)
      : await list(stats, choice, selectHandler);
  }
};

const setUpPage = async (inputHandler, selectHandler) => {
  const player = await inputHandler(inputConfig());
  const stats = new Stats(":memory:");
  stats.initTables();
  console.clear();

  return await mainMenu(stats, selectHandler, player);
};

export const launchApp = async (inputHandler, selectHandler) => {
  console.clear();
  const choice = await selectHandler(launchAppConfig());
  console.clear();

  return choice === "exit" ? "" : await setUpPage(inputHandler, selectHandler);
};

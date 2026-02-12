import { input, select } from "@inquirer/prompts";
import { launchApp } from "./src/interface.js";

const main = async () => {
  return await launchApp(input, select);
};

await main();

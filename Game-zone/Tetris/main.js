// import { input, select } from "@inquirer/prompts";
// import { launchApp } from "./src/interface.js";
import { launchApp } from "./src/app/boot_app.js";
import { boot } from "./src/boot.js";

const main = async () => {
  // return await launchApp(input, select);
  // return await launchApp();
  return await boot()
};

await main();

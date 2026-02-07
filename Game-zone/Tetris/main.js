import { boot } from "./src/boot.js";

const main = async () => {
  return await boot();
}

await main();
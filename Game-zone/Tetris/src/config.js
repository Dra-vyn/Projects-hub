import { Separator } from "@inquirer/prompts";

export const listConfig = () => ({
  message : 'All TIME STATS',
  choices: [
    new Separator(" "),
    {
      name: "Back",
      value: "back",
    }
  ]
})

export const mainMenuConfig = () => ({
  message: "Select an Option",
  choices: [
    new Separator(" "),
    {
      name: "Start New Game",
      value: "playGame",
    },
    new Separator(),
    {
      name: "RANKINGS",
      value: "listStats",
    },
    {
      name: "TOP SCORERS",
      value: "listTopScorers",
    },
    {
      name: "LEVEL LEADERS",
      value: "listLevelLeaders",
    },
    {
      name: "MOST LINES CLEARED",
      value: "listTopLines",
    },
    new Separator(),
    { name: "Exit", value: "exit" },
  ],
  pageSize: 10
});

export const inputConfig = () => ({ message: `Enter Player Name : `, required: true });

export const launchAppConfig = () => ({
  message:
    "WELCOME TO TETRIS\n\nStack smart. Clear lines.\nHow long can you last?",
  choices: [
    new Separator(" "),
    { name: "⏻ LAUNCH", value: "start" },
    new Separator(),
    { name: "Exit", value: "exit" },
  ],
});
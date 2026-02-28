export const listHighScores = async (database) => {
  const buffer = new Uint8Array(10);
  Deno.stdin.setRaw(true);

  while (true) {
    console.clear();

    const highScores = database.listHighScores();

    const scores = highScores.map(({ user_name, score }, i) =>
      `${i + 1}.  ${user_name}  : ${score}`
    ).join("\n");

    console.log(`${scores}\n\n Press Enter To Continue`);

    const n = await Deno.stdin.read(buffer);
    const key = new TextDecoder().decode(buffer.slice(0, n));

    if (key === "\r") return;
  }
};

export const listAllStats = async (database, playerId) => {
  const buffer = new Uint8Array(10);
  Deno.stdin.setRaw(true);

  while (true) {
    console.clear();
    const { games_played, max_score, total_lines } = database.listAllStats(playerId);

    const content =
      `Total Games Played : ${games_played}\nHighest Score : ${max_score}\nTotal Lines Cleared  : ${total_lines}`;

    console.log(`${content}\n\n Press Enter To Continue`);
    const n = await Deno.stdin.read(buffer);
    const key = new TextDecoder().decode(buffer.slice(0, n));

    if (key === "\r") return;
  }
};

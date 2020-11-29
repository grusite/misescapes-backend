const fs = require('fs-extra');
const { resolve } = require('path');
const api = require('./api');

const writeJSON = (filename, obj) =>
  fs.outputJSON(filename, obj, { spaces: 2 });
// const writeFile = (filename, str) => fs.outputFile(filename, str)

async function downloadPublic(dir) {
  await writeJSON(resolve(dir, 'themes.json'), await api.getThemes());
  await writeJSON(resolve(dir, 'audience.json'), await api.getAudience());
  await writeJSON(resolve(dir, 'category.json'), await api.getCategory());
  await writeJSON(resolve(dir, 'cities.json'), await api.getCities());
  await writeJSON(resolve(dir, 'companies.json'), await api.getCompanies());
}

async function downloadGame(dir, gameId) {
  const gameDir = resolve(dir, `games/${gameId}`);

  await writeJSON(resolve(gameDir, 'game.json'), await api.getGame(gameId));
  await writeJSON(
    resolve(gameDir, 'comments.json'),
    await api.getGameComments(gameId),
  );
  // await writeFile(resolve(gameDir, 'page.html'), await api.getGamePage(gameId))
}

async function downloadGamesFromCompanies(dir, companies) {
  const games = companies.reduce(
    (games, company) => games.concat(company.games),
    [],
  );

  for (const i in games) {
    const game = games[i];
    console.log('`downloading game ${i}/${games.length}`');
    try {
      await downloadGame(dir, game.id);
    } catch (err) {
      console.log('err', game.id, err.message);
    }
  }
}
module.exports = {
  downloadPublic,
  downloadGamesFromCompanies,
};

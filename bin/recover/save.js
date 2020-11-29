const Company = require('./companyModel');
const Game = require('./gameModel');
const fs = require('fs-extra');
const { resolve } = require('path');
const { cloneDeepWith, isPlainObject, mapKeys, camelCase } = require('lodash');

function cleanObject(obj) {
  obj = cloneDeepWith(obj, (value, k) => {
    if (isPlainObject(value)) {
      return mapKeys(value, (v, k) => camelCase(k));
    }
  });
  return cloneDeepWith(obj, (value, k) => {
    if (value && (value.en || value.es)) {
      return value.es || value.en;
    }
  });
}

async function saveCompanies(dir) {
  const companies = await fs.readJSON(resolve(dir, 'companies.json'));

  for (let company of companies) {
    company = cleanObject(company);
    company.games = company.games.map(game => game.id);

    console.log('company ', company.id);

    await Company.findOneAndUpdate({ id: company.id }, company, {
      upsert: true,
    });
  }
}

async function saveGames(dir) {
  const games = await fs.readdir(resolve(dir, 'games'));

  for (const gameId of games) {
    console.log('game', gameId);
    let game = await fs.readJSON(resolve(dir, `games/${gameId}/game.json`));

    const { data: comments } = await fs.readJSON(
      resolve(dir, `games/${gameId}/comments.json`),
    );
    game = cleanObject(game);
    game.company = game.company.id;
    game.comments = comments.map(comment => {
      delete comment.game;
      return comment;
    });
    await Game.findOneAndUpdate({ id: game.id }, game, { upsert: true });
  }
}

module.exports = {
  saveCompanies,
  saveGames,
};

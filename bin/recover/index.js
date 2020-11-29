const moment = require('moment');
const fs = require('fs-extra');
const { resolve } = require('path');

const { downloadPublic, downloadGamesFromCompanies } = require('./download');
const { saveCompanies, saveGames } = require('./save');
const db = require('./db');

const id = moment().format('YYYY-MM-DD-HH-mm-ss');
const dir = resolve(__dirname, 'dump', id);

async function start() {
  db.connect();

  console.log('start ', dir);

  // await downloadPublic(dir);

  // const companies = await fs.readJSON(
  //   resolve('./bin/recover', 'companies.json'),
  // );
  // await downloadGamesFromCompanies(dir, companies);

  await saveCompanies('./bin/recover');
  await saveGames('./bin/recover');
  db.disconnect();
}

start();

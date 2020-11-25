const moment = require('moment')
const fs = require('fs-extra')
const { resolve } = require('path')

const { downloadPublic, downloadGamesFromCompanies } = require('./download')
const { saveCompanies, saveGames } = require('./save')
const db = require('../../app/lib/db')

const debug = require('debug')('app:recover')
const id = moment().format('YYYY-MM-DD-HH-mm-ss')
const dir = resolve(__dirname, 'dump', id)

async function start() {
  db.connect()
  debug('start', dir)

  await downloadPublic(dir)

  const companies = await fs.readJSON(resolve(dir, 'companies.json'))
  await downloadGamesFromCompanies(dir, companies)

  await saveCompanies(dir)
  await saveGames(dir)
  db.disconnect()
}

start()

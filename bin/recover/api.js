const axios = require('axios');

const client = axios.create({
  baseURL: 'https://www.escaperoomlover.com/api/es/public',
});

client.interceptors.request.use(config => {
  console.log('req', config.method, config.url);
  return config;
});

client.interceptors.response.use(response => {
  console.log('res', response.status, response.data && response.data.length);
  return response;
});

async function apiCall(options) {
  let res;
  try {
    res = await client(options);
  } catch (err) {
    if ((err.response.status | 0) === 429) {
      const ts = err.response.headers['x-ratelimit-reset'] | 0;
      const now = (Date.now() / 1000) | 0;
      await delay(ts - now);
      return apiCall(options);
    }

    throw err;
  }
  return res;
}

function delay(s) {
  if (!s) throw new Error('No time delayed');
  console.log('req-delayed', s);
  return new Promise(resolve => setTimeout(resolve, s * 1000));
}

async function getCities() {
  const res = await apiCall('/city/all');
  return res.data;
}

async function getCompanies() {
  const res = await apiCall('/company/all');
  return res.data;
}

async function getThemes() {
  const res = await apiCall('/games/theme/all');
  return res.data;
}

async function getAudience() {
  const res = await apiCall('/games/audience/all');
  return res.data;
}
async function getCategory() {
  const res = await apiCall('/games/category/all');
  return res.data;
}

async function getGame(gameId) {
  const res = await apiCall(`/game/${gameId}`);
  return res.data;
}

async function getGameComments(gameId) {
  const res = await apiCall(`comment?status=approved&gameId=${gameId}`);
  return res.data;
}
async function getGamePage(gameId) {
  const res = await apiCall(
    `https://www.escaperoomlover.com/es/juego/${gameId}`,
  );
  return res.data;
}

module.exports = {
  getCities,
  getCompanies,
  getThemes,
  getAudience,
  getCategory,
  getGame,
  getGameComments,
  getGamePage,
};

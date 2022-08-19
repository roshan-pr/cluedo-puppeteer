const puppeteer = require('puppeteer');

const delay = { delay: 10 };
const size = { height: 1000, width: 1800 }

const visitPage = (url) =>
  new Promise((res, rej) => {
    puppeteer.launch({ headless: false })
      .then(browser => browser.newPage())
      .then(page => page.goto(url)
        .then(() => page.setViewport(size))
        .then(() => res(page)))
      .catch(error => rej(error));
  });

const login = username =>
  page => new Promise((res, rej) => {
    page.type('#username', username)
      .then(() => page.click('.play-button', delay)
        .then(() => res(page)))
      .catch(error => rej(error));
  });

const hostGame = (page, numOfPlayers) =>
  new Promise((res, rej) => {
    const hostButton = 'input[value=HOST]';
    page.waitForSelector(hostButton)
      .then(() => page.type('select', numOfPlayers))
      .then(() => page.click(hostButton, delay)
        .then(() => res(page)))
      .catch(err => rej(err));
  });

const getRoomId = page =>
  new Promise((res, rej) => {
    page.waitForSelector('.room-id')
      .then(() => res(page.url().slice(-5)))
      .catch(err => rej(err));
  });

const joinGame = (roomId) =>
  page =>
    new Promise((res, rej) => {
      const joinButton = '#join-button';
      const roomIdInput = 'input[name="room-id"]';
      page.waitForSelector(joinButton)
        .then(() => page.waitForSelector(roomIdInput))
        .then(() => page.type(roomIdInput, roomId))
        .then(() => page.click(joinButton)
          .then(() => res(page)))
        .catch(err => rej(err));
    });

module.exports = { visitPage, login, hostGame, getRoomId, joinGame };

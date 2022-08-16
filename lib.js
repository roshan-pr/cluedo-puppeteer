const puppeteer = require('puppeteer');

const delay = { delay: 1000 };

const visitPage = (url) =>
  new Promise((res, rej) => {
    puppeteer.launch({ headless: false })
      .then(browser => browser.newPage())
      .then(page => page.goto(url)
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

const hostGame = numOfPlayers =>
  page => new Promise((res, rej) => {
    const hostButton = 'input[value=HOST]';
    page.waitForSelector(hostButton)
      .then(() => page.type('select', numOfPlayers))
      .then(() => page.click(hostButton, delay)
        .then(() => res(page)))
      .catch(err => rej(err));
  });

module.exports = { visitPage, login, hostGame };

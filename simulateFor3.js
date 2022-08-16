const { visitPage, login, hostGame, getRoomID } = require('./lib.js');

const url = 'http://localhost:8000';
const username1 = 'Bani';
const username2 = 'Praju';
const username3 = 'Chhavi';
const numOfPlayers = '4';

visitPage(url)
  .then(login(username1))
  .then(hostGame(numOfPlayers))
  .then(getRoomID)
  .then(roomId => {
    console.log('last-----', roomId);
  });
visitPage(url).then(login(username2));
visitPage(url).then(login(username3));

const { visitPage, login, hostGame, getRoomId, joinGame } = require('./lib.js');

const url = 'http://localhost:8000';
const user1 = 'Bani';
const user2 = 'Praju';
const user3 = 'Chhavi';
const numOfPlayers = '3';

const loginUser = (user) => visitPage(url).then(login(user));

const startGame = ([hostPage, ...joineePages]) => {
  hostGame(hostPage, numOfPlayers)
    .then(getRoomId)
    .then(roomId => joineePages.map(joinGame(roomId)))
};

const main = () =>
  Promise.all([user1, user2, user3].map(loginUser))
    .then(startGame);

main();

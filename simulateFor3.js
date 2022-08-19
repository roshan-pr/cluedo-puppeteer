const { visitPage, login, hostGame, getRoomId, joinGame } = require('./lib.js');

const count = +process.argv[2];
const PLAYERS_COUNT = count <= 6 && count >= 3 ? count : 3;
const IP = process.argv[3] || '127.0.0.1';
const PORT = process.argv[4] || 8000;

const url = `http://${IP}:${PORT}`;
const players = ['Barnali', 'Prajakta', 'Chhavi', 'Prem', 'Sakshi', 'Azhar']

const loginUser = (user) => visitPage(url).then(login(user));

const startGame = ([hostPage, ...joineePages]) => {
  hostGame(hostPage, `${PLAYERS_COUNT}`)
    .then(getRoomId)
    .then(roomId => joineePages.map(joinGame(roomId)))
};

const main = () =>
  Promise.all(players.slice(0, PLAYERS_COUNT).map(loginUser))
    .then(startGame);

main();

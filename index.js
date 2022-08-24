const { visitPage, login, hostGame, getRoomId, joinGame } = require('./lib.js');

const loginUser = (url, username) => visitPage(url).then(login(username));

const startGame = ([hostPage, ...joineePages], numOfPlayers) => {
  hostGame(hostPage, numOfPlayers)
    .then(getRoomId)
    .then(roomId => joineePages.map(joinGame(roomId)))
};

const joinToGame = (joineePages, roomId) =>
  joineePages.map(joinGame(roomId));

const main = ([option, numOfPlayers, ...inputs]) => {
  let ip;
  let roomId;
  if (numOfPlayers < 2 || numOfPlayers > 6) {
    console.log('Number of players should be in range 3 to 6');
    return;
  }

  if (option === '-j') {
    console.log('Make sure the game is hosted!!!');
    roomId = inputs[0];
    ip = inputs[1] || '127.0.0.1'; // IP address
  }
  else if (option === '-l') {
    ip = inputs[0] || '127.0.0.1'; // IP address
  }
  else {
    console.log('illigal option');
    return;
  }
  const url = `http://${ip}:8000`;
  const players = ['Barnali', 'Prajakta', 'Chhavi', 'Prem', 'Sakshi', 'Azhar'].slice(0, numOfPlayers);

  Promise.all(players.map(player =>
    loginUser(url, player)))
    .then(pages => {
      if (option === '-l')
        startGame(pages, numOfPlayers + '');
      if (option === '-j')
        joinToGame(pages, roomId + '');
    });
};

main(process.argv.slice(2));

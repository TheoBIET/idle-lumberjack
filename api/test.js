const Game = require('./models/Game');

const newGame = new Game();
const defaultGame = new Game();
for(let i=0; i<4; i++) {
    newGame.silo.upgrade();
    newGame.sawmill.upgrade();
}
console.log(defaultGame, newGame);
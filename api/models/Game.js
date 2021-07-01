const UTILS = require('./utils');
const {GAME} = require('./constants')
const Sawmill = require('./Sawmill');
const Silo = require('./Silo');

class Game{
    constructor() {
        this.stock = GAME.STOCK;
        this.sawmill = new Sawmill();
        this.silo = new Silo();
        this.lastUpdate = UTILS.getCurrentTime();
    }
}

module.exports = Game;
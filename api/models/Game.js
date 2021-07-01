const FUNCTIONS = require('../utils/functions');
const {GAME} = require('../utils/constants')
const Sawmill = require('./Sawmill');
const Silo = require('./Silo');

/**
 * Instantiate a new game 
 * @constructor
 * @param {user_uid} _id  - The user's mongoose _id
 */
class Game{
    constructor() {
        this.stock = GAME.stock;
        this.sawmill = new Sawmill();
        this.silo = new Silo();
        this.lastUpdate = FUNCTIONS.getCurrentTime();
    }
}


module.exports = Game;

const mongoose = require('mongoose');
const { GAME, SAWMILL, SILO } = require('../utils/constants');
const Sawmill = require('./Sawmill');
const Silo = require('./Silo');

const defaultGame = {
    stock: GAME.stock,
    sawmill: new Sawmill(),
    silo: new Silo(),
    lastUpdate: Date.now()
}

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    password: String,
    profile_picture_url: { type: String, default: 'http://localhost:3000/api/img/default_avatar.jpg' },
    game: {
        type: {
            stock: { type: Number, default: GAME.stock },
            sawmill: {
                type: {
                    level: { type: Number, default: SAWMILL.LEVEL },
                    yield: { type: Number, default: SAWMILL.YIELD },
                    cost: { type: Number, default: SAWMILL.COST }
                }, default: new Sawmill()
            },
            silo: {
                type: {
                    level: { type: Number, default: SILO.LEVEL },
                    cost: { type: Number, default: SILO.COST },
                    capacity: { type: Number, default: SILO.CAPACITY }
                }, default: new Silo()
            },
            lastUpdate: { type: Date, default: Date.now() }
        }, default: defaultGame
    }
});

module.exports = mongoose.model("User", userSchema);
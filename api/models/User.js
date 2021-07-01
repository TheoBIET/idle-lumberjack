
const mongoose = require('mongoose');
const Game = require('./Game');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {'type': String},
    email: {'type': String},
    password: {'type': String},
    profile_picture_url: {'type':String, 'default': 'http://localhost:3000/img/default_avatar.'},
    game: new Game()
});

module.exports = mongoose.model("User", userSchema)
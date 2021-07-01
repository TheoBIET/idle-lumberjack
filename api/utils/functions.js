require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const FUNCTIONS = {
    async createUser(user) {
        // We generate an _id for the user that will be inserted and we merge with the data received in parameters
        const merged = Object.assign({
            _id: mongoose.Types.ObjectId()
        }, user);
        const createGuild = await new User(merged)
        createGuild.save().then(user => {
            console.log(`${user.username} vient de s'inscrire!`);
        })
    },

    async getAllUsers() {
        
    }
}

module.exports = FUNCTIONS;
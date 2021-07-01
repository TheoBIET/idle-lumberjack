require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const FUNCTIONS = {
    async createUser(user) {
        try {
            // We try to find records with the same email / username
            const checkEmail = await User.find({email: user.email});
            const checkUsername = await User.find({username: user.username});

            // We check that the email or the username are not already used
            if(checkEmail) {
                throw new Error('A user already exists with this e-mail address');
            } else if(checkUsername) {
                throw new Error('A user already exists with this username');
            }

            // We generate an _id for the user that will be inserted and we merge with the data received in parameters
            const merged = Object.assign({
                _id: mongoose.Types.ObjectId()
            }, user);

            // We save user in database 
            const createUser = await new User(merged);
            createUser.save().then(g => console.log(`${user.username} s'est inscrit sur le site!`));

        } catch (error) {
            console.log(error);
        }
    },

    async getAllUsers() {
        const data = await User.find();
        if (data) return data;
    },

    async checkCredentials(user) {
        const checkUsername = await User.find({username: user.username});
        const checkPassword = await User.find({password: user.password});
        if(checkPassword.length && checkUsername.length) {
            const user = checkPassword[0]
            return user;
        } else if (!checkPassword.length, checkUsername.length) {
            const user = checkUsername[0];
            user.password = null;
            return user;
        }
    }
}

module.exports = FUNCTIONS;
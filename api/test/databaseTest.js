const FUNCTIONS = require('../utils/functions');
const mongoose = require('../utils/mongoose');

mongoose.init();

const user = {
    username: 'davdav',
    email: 'dev.theobiet@gmail.com',
    password: 'davdav'
}

const run = async () => {
    await FUNCTIONS.createUser(user)
}

run()
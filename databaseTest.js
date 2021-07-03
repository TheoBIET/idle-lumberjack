require('dotenv').config();

const {User, Building} = require('./api/models');

(async() => {
    const users = await User.findAll();
    const buildings = await Building.findAll()

    console.log(buildings);
})()
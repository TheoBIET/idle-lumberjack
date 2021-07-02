const router = require('express').Router();

const{
    gameController,
    userController
} = require('./controllers');

router
    // Allows to authenticate to the API
    .post('/api/login', userController.handleLogin)

    // Create a user on database
    .post('/api/signup', userController.handleSignup)

    // Upgrade the sawmill
    .post('/api/sawmill/upgrade', gameController.upgradeSawmill)

    // Upgrade the silo
    .post('/api/silo/upgrade', gameController.upgradeSilo)

    // Save the new user's data
    .post('/api/:username/update', gameController.updateInformations)

module.exports = router;
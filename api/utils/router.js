const router = require('express').Router();

const {
    gameController,
    userController
} = require('../controllers');

router
    // Allows to authenticate to the API
    .post('/login', userController.handleLogin)

    // Create a user on database
    .post('/signup', userController.handleSignup)

    // Get game status
    .get('/api/:username/status', userController.getUserStatus)

    // Save game status
    .post('/api/:username/save', userController.saveUserStatus)

    // Get current leaderboard
    .get('/api/leaderboard', gameController.getBuildingList)

    // Get all buildings list
    .get('/api/building', gameController.getBuildingList)

    // Buy building
    .post('/api/:username/:building/buy', gameController.buyBuilding)

    // Upgrade building
    .post('/api/:username/:building/upgrade', gameController.upgradeBuilding)

module.exports = router;
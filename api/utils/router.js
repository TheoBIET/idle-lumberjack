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
    .get('/api/leaderboard', userController.getLeaderboard)

    // Get all buildings list
    .get('/api/building', gameController.getBuildingList)

    // Get buy list for a user
    .get('/api/:username/building', gameController.getBuyList)

    // Upgrade building
    .get('/api/:username/:buildingId/upgrade', gameController.upgradeBuilding)

module.exports = router;
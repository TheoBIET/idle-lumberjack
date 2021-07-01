const router = require('express').Router();

const{
    mainController,
    gameController
} = require('./controllers');

router
    .use(gameController.initGame)
    .get('/api/status', mainController.getStatus)
    .get('/api/sawmill/upgrade', gameController.upgradeSawmill)
    .get('/api/silo/upgrade', gameController.upgradeSilo)

module.exports = router;
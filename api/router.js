const router = require('express').Router();

const{
    GameController
} = require('./controllers/index');

router
    .use(GameController.initGame)
    .get('/status', GameController.status)
    .get('/sawmill/upgrade', GameController.upgradeSawmill)
    .get('/silo/upgrade', GameController.upgradeSilo)

module.exports = router;
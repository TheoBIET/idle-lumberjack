const Sawmill = require('../models/Sawmill');
const Silo = require('../models/Silo');

const gameController = {
    upgradeSawmill: (req, res) => {
        const { game } = request.session;
        return response.redirect('/status');
    },

    upgradeSilo: (req, res) => {
        const { game } = req.session;
        return res.redirect('/status');
    },

    updateInformations: (req, res) => {
      
    }
};

module.exports = gameController;
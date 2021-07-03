const { Building, User } = require("../models");
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../models/User");

const gameController = {
    getBuildingList: async (req, res) => {
        const buildingsList = await Building.findAll();
        res.send(buildingsList);
    },

    getBuyList: async (req, res) => {
        const user = await User.findOne({ where: { username: req.params.username } });

        if (!user) {
            return res.send({ message: 'The username isn\'t correct' });
        }

        const buyingList = await sequelize.query(`SELECT * FROM "user_has_building" WHERE "user_id" = ${user.id} ORDER BY "building_id"`);
        res.send(buyingList);
    },

    upgradeBuilding: async (req, res) => {
        const user = await User.findOne({ where: { username: req.params.username } });
        const buildingId = parseInt(req.params.buildingId, 10);
        const building = await Building.findOne({ where: { id: buildingId } });
        const buildingToUpgrade = await sequelize.query(`SELECT * FROM "user_has_building" 
        WHERE "user_id" = ${user.id} AND "building_id" = ${buildingId};`,
            { type: QueryTypes.SELECT });

        if (!user) {
            return res.send({ message: 'The username isn\'t correct' });
        }

        if (!building) {
            return res.send({ message: 'Incorrect building ID' });
        }

        if (user.stock < buildingToUpgrade[0].actual_cost) {
            return res.send({ message: 'No enough money!' });
        }

        const newBuildingCost = buildingToUpgrade[0].actual_cost * building.cost_factor;
        const newBuildingValue = buildingToUpgrade[0].actual_value * building.upgrade_factor;
        const newLevel = parseInt(buildingToUpgrade[0].level, 10) + 1;

        await sequelize.query(`
        UPDATE "user_has_building" SET
        level = ${newLevel},
        actual_cost = ${newBuildingCost},
        is_user_buyed = true,
        actual_value = ${newBuildingValue}
        WHERE "user_id" = ${user.id} AND "building_id" = ${buildingId}
        `)

        res.send({ message: 'Upgrade successfully' });
    }
};

module.exports = gameController;
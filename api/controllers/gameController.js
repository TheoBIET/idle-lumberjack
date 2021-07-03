const { Building, User } = require("../models");
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../models/User");
const { parse } = require("dotenv");

const gameController = {
    getBuildingList: async (req, res) => {
        const buildingsList = await Building.findAll();
        res.send(buildingsList);
    },

    buyBuilding: async (req, res) => {
        const user = await User.findOne({ where: { username: req.params.username } });
        const buildingId = parseInt(req.params.buildingId, 10);
        const building = await Building.findOne({ where: { id: buildingId } });

        if (!user) {
            return res.send({ message: 'The username isn\'t correct' });
        }

        if (!building) {
            return res.send({ message: 'Incorrect building ID' });
        }

        const checkIfUserAlreadyHaveThisBuilding = await sequelize.query(`
        SELECT * FROM "user_has_building" WHERE "user_id" = ${user.id} AND "building_id" = ${building.id}`,
            { type: QueryTypes.SELECT });

        if (checkIfUserAlreadyHaveThisBuilding.length) {
            return res.send({ message: 'User already have this building' });
        }

        if (user.stock < building.default_cost) {
            return res.send({ message: 'No enough money!' });
        }

        await sequelize.query(`INSERT INTO "user_has_building"("building_id","user_id","actual_cost","actual_value") 
        VALUES (${building.id}, ${user.id}, ${building.default_cost}, ${building.default_value});`,
            { type: QueryTypes.INSERT });

        res.send({ message: 'Buy successfully' });
    },

    upgradeBuilding: async (req, res) => {
        const user = await User.findOne({ where: { username: req.params.username } });
        const buildingId = parseInt(req.params.buildingId, 10);
        const building = await Building.findOne({ where: { id: buildingId } });
        const buildingToUpgrade = await sequelize.query(`SELECT * FROM "user_has_building" 
        WHERE "user_id" = ${user.id} AND "building_id" = ${buildingId}`,
            { type: QueryTypes.SELECT });

        if (!user) {
            return res.send({ message: 'The username isn\'t correct' });
        }

        if (!building) {
            return res.send({ message: 'Incorrect building ID' });
        }

        if (!buildingToUpgrade.length) {
            return res.send({ message: 'User don\'t have this building' });
        }

        if (user.stock < buildingToUpgrade[0].actual_cost) {
            return res.send({ message: 'No enough money!' });
        }

        const newBuildingCost = buildingToUpgrade[0].actual_cost * building.cost_factor;
        const newBuildingValue = buildingToUpgrade[0].actual_value * building.upgrade_factor;
        const newLevel = parseInt(buildingToUpgrade[0].level, 10)  + 1;

        await sequelize.query(`
        UPDATE "user_has_building" SET
        level = ${newLevel},
        actual_cost = ${newBuildingCost},
        actual_value = ${newBuildingValue};
        `)

        res.send({ message: 'Upgrade successfully' });
    }
};

module.exports = gameController;
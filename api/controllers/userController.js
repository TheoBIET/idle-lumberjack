const { User, Building } = require('../models');
const bcrypt = require('bcrypt');
const { sequelize } = require("../models/User");

const userController = {
    handleLogin: async (req, res) => {
        const user = await User.findOne({
            where: {
                username: req.body.username
            },
            include: ['buildings']
        });

        // If user is false, it means that the database does not contain any user with the given username
        if (!user) {
            return res.send({
                message: 'Invalid Username, retry.',
                correctUsername: false,
                correctPassword: false
            })
        }

        // We check the correspondence of the password hashes
        const passwordToCompare = req.body.password;
        const userHashedPassword = user.password;
        const isPasswordCorrect = await bcrypt.compare(passwordToCompare, userHashedPassword);

        if (!isPasswordCorrect) {
            return res.send({
                message: 'Invalid Password, retry.',
                correctUsername: true,
                correctPassword: false
            })
        }


        // We delete the user's password hash for more security, it's useless to have on FrontEnd
        delete user.password;

        // If all constraints are OK, then the user is legitimate, so we can return his information
        res.send(user);
    },

    handleSignup: async (req, res) => {
        const newUser = req.body;
        const buildings = await Building.findAll();

        // We check if the minimum information is present in req.body.
        if (!newUser.username && !newUser.password) {
            return res.send({
                message: 'Invalid body. Minimals informations are username & password.',
            })
        }

        const isUsernameExists = await User.findOne({ where: { username: newUser.username } });

        // We check if the username is already in use or not.
        if (isUsernameExists) {
            return res.send({
                message: 'Username already exists, take another and retry. If u want connect POST on /login',
                usernameAlreadyUsed: true
            })
        }

        // Before inserting the user into the database, we have to hash his password
        const passwordToBeHash = newUser.password;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passwordToBeHash, saltRounds);

        // We prepare the Sequelize instance to be inserted in the database
        const userToBeInsert = await User.build({
            username: newUser.username,
            password: hashedPassword,
            clic_dps: 1
        })

        // We check if the user has entered a personalized profile picture
        if (newUser.profile_picture_url) {
            userToBeInsert.profile_picture_url = newUser.profile_picture_url;
        }

        // And now, we can save
        await userToBeInsert.save();

        // Create an instance of all buildings for the current user
        console.log(buildings);
        for (const building of buildings) {
            console.log(building);
            await sequelize.query(`
                INSERT INTO "user_has_building"("user_id", "building_id", "building_name", "actual_cost", "actual_value") VALUES
                (${userToBeInsert.id}, ${building.id}, '${building.name}', ${building.default_cost}, ${building.default_value});
            `)
        }

        return res.send({
            message: 'The user has successfully registered',
            isRegistered: true
        });
    },

    getUserStatus: async (req, res) => {
        const username = req.params.username;
        const userIsFound = await User.findOne({
            where: {
                username: username
            },
            include: ['buildings']
        });

        if (!userIsFound) {
            res.send('The username isn\'t correct');
        }

        // delete the user's password hash
        delete userIsFound.password;

        return res.send(userIsFound);
    },

    saveUserStatus: async (req, res) => {
        const username = req.params.username;
        const userIsFound = await User.findOne({ where:{username: username }});

        if (!userIsFound) {
            res.send('The username isn\'t correct');
        }

        const newInformations = req.body;

        await userIsFound.update({
            stock: newInformations.stock,
            number_of_clics: newInformations.number_of_clics,
            clic_dps: newInformations.clic_dps,
            building_dps: newInformations.building_dps,
            stock_capacity: newInformations.stock_capacity
        });

        res.status(200).send({ message: 'Updated successfully' });
    },

    getLeaderboard: async (req, res) => {
        const leaderboard = await User.findAll({
            limit: 10,
            order: ['number_of_clics']
        });

        console.log(leaderboard);

        res.send(leaderboard);
    }
}

module.exports = userController;
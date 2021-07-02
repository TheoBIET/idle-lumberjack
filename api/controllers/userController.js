const db = require('../utils/functions');

const userController = {
    handleLogin: async (req, res) => {
        try {
            let data = await db.checkCredentials(req.body);

            if(!data) {
                return res.status(200).send({correctUsername:false, correctPassword:false})
            }

            if(!data.password) {
                return res.status(200).send({correctUsername:true, correctPassword:false})
            }

            data.password = null;
            res.status(200).send(data)
        } catch (error) {
            console.log(error)
        }
    },

    handleSignup: (req, res) => {
        try {
            console.log(req.body)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = userController;
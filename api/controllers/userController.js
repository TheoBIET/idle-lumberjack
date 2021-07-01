const db = require('../utils/functions');

const userController = {
    handleLogin: async (req, res) => {
        try {
            let data = await db.checkCredentials(req.body);

            if(!data) {
                return res.status(200).send({username:false, password:false})
            }

            if(!data.password) {
                return res.status(200).send({username:true, password:false})
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
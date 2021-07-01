const mongoose = require('mongoose');

module.exports = {
    init: () => {
        const mongOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }

        mongoose.connect(process.env.DATABASE_URL, mongOptions);
        mongoose.Promise = global.Promise;
        mongoose.connection.on('connected', () => console.log('Mongoose est connecté!'));
    }
}
require('dotenv').config();

const express = require('express');
const app = express();
const session = require('express-session');
const router = require('./api/router');
const PORT = process.env.PORT || 3003;

app
    // We display the frontend on /
    .use('/', express.static('frontend'))

    // We make calls to the API and and give the files such as the images on the URL /api
    .use('/api', express.static('api/public'))

    // We will use cookies to store data about the current user, useful for the authentication system
    // This will also be used to store information about the current game in order to write to the database only when the user performs a particular action like passing a level
    .use(session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET
    }))


    .use(router)

app.listen(PORT, () => console.log(`o\'dle started at http://localhost:${PORT}`));
require('dotenv').config();

const express = require('express');
const sanitizer = require('sanitizer');
const app = express();
const router = require('./api/router');
const PORT = process.env.PORT || 3003;
const cors = require('cors')
const mongoose = require('./api/utils/mongoose');

app
    .use(cors())
    .use(express.urlencoded({
        extended: true
    }))
    // Pour prévenir des failles XSS, on met en place un sanitizer qui nous permettra d'empêcher à l'utilisateur de rentré du HTML
    .use((req, res, next) => {
        for (const key in req.body) {
            req.body[key] = sanitizer.escape(req.body[key]);
        }
        next();
    })
    // We display the frontend on /
    .use('/', express.static('frontend'))
    // .use(basicAuth({
    //     users: {"admin": "admin"}
    // }))
    // We make calls to the API and and give the files such as the images on the URL /api
    .use('/api', express.static('api/public'))
    .use(router)

app.listen(PORT, () => {
    console.log(`o\'dle started at http://localhost:${PORT}`);
    mongoose.init();
});
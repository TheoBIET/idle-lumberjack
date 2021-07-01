require('dotenv').config();

const express = require('express');
const basicAuth = require('express-basic-auth');
const mongoose = require('./api/utils/mongoose');
const app = express();
const router = require('./api/router');
const PORT = process.env.PORT || 3003;

app
    // We display the frontend on /
    .use('/', express.static('frontend'))
    .use(basicAuth({
        users: { 'admin': 'admin' }
    }))    
    // We make calls to the API and and give the files such as the images on the URL /api
    .use('/api', express.static('api/public'))
    .use(router)

app.listen(PORT, () => console.log(`o\'dle started at http://localhost:${PORT}`));
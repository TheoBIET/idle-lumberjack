const basicAuth = require('express-basic-auth');

const authChecker = (username, password) => {
    const userMatches = basicAuth.safeCompare(username, 'customuser')
    const passwordMatches = basicAuth.safeCompare(password, 'custompassword')
    return userMatches & passwordMatches
}

const authenticationMiddleware = async (req, res, next) => {
    if(authChecker()) {
        console.log('ok');
    } else {
        res.status(401).send();
    }
}

module.exports = authenticationMiddleware;
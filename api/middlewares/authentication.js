const basicAuth = require('express-basic-auth');

const authChecker = (username, password) => {
    const userMatches = basicAuth.safeCompare(username, 'customuser')
    const passwordMatches = basicAuth.safeCompare(password, 'custompassword')
    return userMatches & passwordMatches
}

const authenticationMiddleware = async (req, res, next) => {
    console.log('Authentication Started');
    console.log(req)
    if(authChecker('customuser', 'customdddpassword')) {
        console.log('Authentication Success');
    } else {
        console.log('Authentication Failed');
        res.status(202)
    }
}

module.exports = authenticationMiddleware, authChecker;
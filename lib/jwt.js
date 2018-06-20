const jwt = require('jsonwebtoken');
const util = require('util');
const jwtConfig = require('../config.json').jwt

function sign(payload, options, cb) {
    return jwt.sign(payload, jwtConfig.secret, options, cb);
}

module.exports = {
    signAsync: util.promisify(sign)
}
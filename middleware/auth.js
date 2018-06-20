const jwt = require('koa-jwt')
const jwtConfig = require('../config.json').jwt
module.exports = function () {
    return jwt({
        secret: jwtConfig.secret
    })
}
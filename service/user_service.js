const bcrypt = require('bcryptjs');
const jwtTool = require('../lib/jwt')
let user
class UserService {
    constructor(...args) {
        [user] = args
    }

    async register(userObj) {
        return await user.insertOne(userObj)
    }

    async getPassHash(password) {
        let salt = await bcrypt.genSalt(8)
        return await bcrypt.hash(password, salt)
    }

    async comparePassword(passwordBefore, passwordAfter) {
        let result = await bcrypt.compare(passwordBefore, passwordAfter);
        return result
    }

    async getToken(id) {
        let payload = {
            "sub": id
        }
        let options = {
            expiresIn: '1d'
        }
        let token = await jwtTool.signAsync(payload, options)
        return token
    }

    initUser(params) {
        let u = {}
        if (params.hasOwnProperty('name')) {
            u.name = params.name
        }
        if (params.hasOwnProperty('password')) {
            u.password = params.password
        }
        return u
    }

}
module.exports = UserService;
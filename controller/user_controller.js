let user, userService;
class UserController {
    constructor(...args) {
        [user, userService] = args
    }

    async register(ctx) {
        let body = ctx.request.body
        body.password = await userService.getPassHash(body.password)
        let obj = userService.initUser(body)
        let err, result;
        if (await user.findOne({
                name: body.name
            })) {
            err = new Error("User with same name exists.")
        } else {
            result = await userService.register(obj).catch(e => {
                err = e
            })
        }
        if (err) {
            ctx.body = {
                msg: "Duplicate user name."
            }
            ctx.status = 400
            return
        }
        let _id = result.insertedId
        let token = await userService.getToken(_id)
        ctx.body = {
            token,
            name: body.name
        }
    }

    async login(ctx) {
        let body = ctx.request.body
        ctx.body = {
            msg: "User name and password do not match."
        }
        ctx.status = 404
        let {
            name,
            password
        } = body;
        let userObj = await user.findOne({
            name
        })
        if (!userObj) return
        let matchPassword = await userService.comparePassword(password, userObj.password)
        if (!matchPassword) return
        let _id = userObj._id
        let token = await userService.getToken(_id)
        ctx.body = {
            token: token,
            name: userObj.name
        }
        ctx.statue = 200
    }

}
module.exports = UserController;
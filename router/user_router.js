const Router = require('koa-router');
const router = new Router();

module.exports = function (auth, koaBody, userController) {
    router.post('/login', koaBody, userController.login)
    router.post('/register', koaBody, userController.register)
    // router.get('/users', auth, )
    return router.routes()
}
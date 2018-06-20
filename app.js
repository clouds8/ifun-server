const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const config = require('./config.json')
const auth = require('./middleware/auth')
const koaBody = require('koa-body')();

//model
const User = require('./model/user')
const user = new User();


//service
const UserService = require('./service/user_service')
const userService = new UserService(user)

//controller
const UserController = require('./controller/user_controller');
const userController = new UserController(user, userService)

//router
const userRouter = require('./router/user_router');

router.get('/', (ctx, next) => {
    ctx.response.status = 200;
    ctx.response.body = {
        msg: "hello world!"
    }
})


app.on('error', (err, ctx) => {
    console.log('server error', err, ctx);
})

app.use(router.routes())
// .use(router.allowedMethods());

app.use(userRouter(auth, koaBody, userController))

app.listen(config.port || 3000);
const Koa = require('koa')
const app = new Koa();
const PORT = process.env.PORT

//response
app.use(ctx => {
    ctx.body = 'Hello Koa'
})

app.listen(PORT)
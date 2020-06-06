import jwt from 'jsonwebtoken'
import User from '../models/user'

const jwtMiddleware = (ctx, next) => {
    const token = ctx.cookies.get('access_token');
    if(!token) return next();
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        ctx.state.user = {
            id: decode.id,
            username: decode.username,
        };
        //토큰의 남은 기간이 3.5일 미만이면 재발급
        const now = Math.floor(Date.now() / 1000);
        if (decode.exp - now < 60 * 60 * 24 * 3.5) {
            const user = await User.findById(decode.id)
            const token = user.generateToken()
            ctx.cookies.set('access_token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
            })
        }
        console.log(decode)
        return next()
    } catch(e) {
        return next()
    }
}

export default jwtMiddleware
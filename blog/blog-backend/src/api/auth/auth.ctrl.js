import Joi from 'joi';
import User from '../../models/user';

export const register = async ctx => {
    const schema = Joi.object().keys({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
        password: Joi.string().required(),
    });
    const result = Joi.validate(ctx.request.body, schema);
    if(result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const {username, password} = ctx.request.body;
    try{
        //username이 존재여부 확인
        const exists = await User.findByUsername(username);
        if(exists) {
            ctx.status = 409;
            return;     
        }

        const user = new User({
            username,
        });
        await user.setPassword(password);   //비밀번호 설정
        await user.save();  //데이터베이스 저장

        //응답할 데이터에서 hashedPassword제거
        ctx.body = user.serialize();

        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,    //7일
            httpOnly: true,
        });
    } catch(e) {
        ctx.throw(500, e);
    }
}

export const login = async ctx => {
    const { username, password } = ctx.request.body;

    //username, password가 없으면 에러 발생
    if(!username || !password) {
        ctx.status = 401;   //Unauthorized
        return;
    }

    try{
        const user = await User.findByUsername(username);
        //계정이 존재하지 않으면 에러처리
        if(!user) {
            ctx.status = 401;
            return; 
        }
        const valid = await user.checkPassword(password);
        //잘못된 비밀번호
        if(!valid) {
            ctx.status = 401;
            return;
        }
        ctx.body = user.serialize();

        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,    //7일
            httpOnly: true,
        });
    } catch(e) {
        ctx.throw(500, e);
    }
}

export const check = async ctx => {
    //로그인 상태 확인
}

export const logout = async ctx => {
    //로그아웃
}
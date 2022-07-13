import * as userRepository from './userRepository';
import jwt from 'jsonwebtoken';
import { RateLimiterMemory }  from 'rate-limiter-flexible';
import {compare} from 'bcrypt'
import util from 'node:util';
import * as dotenv from 'dotenv'
const opts = {
  points: 3,
  duration: 20*60,
};

dotenv.config();
const rateLimiter = new RateLimiterMemory(opts);
const sign = util.promisify(jwt.sign);
export default async function login(username, password){
    // if (req.session.user) {
    //     return res.json({ status: 'success', message: 'Already logged in' });
    // }
    let limit = await rateLimiter.get(username);
    let remainingPoints = limit? limit.remainingPoints:2;
    if(limit && limit.remainingPoints==0)
    {
        throw new Error("Login limit exceeded")
    }
        

    let user = await userRepository.getByUsername(username);
    if (!user) {
        await rateLimiter.consume(username, 1);
        throw new Error('Incorrect Username or Password. You have ' + remainingPoints+ ' attempt(s) left');
    }

    let comparisonResult = await compare(password, user.password)
    if (comparisonResult == true) {
        await rateLimiter.delete(username);
        let token = await sign({ userName: user.userName},
            process.env.SECRET,
            { expiresIn: 60*15 });
        return token;
    }
    else {
        await rateLimiter.consume(username, 1);
        throw new Error('Incorrect Username or Password. You have ' + remainingPoints + ' attempt(s) left');
       
    }
};
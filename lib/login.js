import * as userRepository from './repository/userRepository';
import jwt from 'jsonwebtoken';
import {compare} from 'bcrypt'
import * as dotenv from 'dotenv'
import RegionModel from './repository/regionModel';
import regionLimits from './regionLimits';
import util from 'node:util';
import getRegionConfig from './repository/configDAO';
dotenv.config();
const sign = util.promisify(jwt.sign);

export default async function login(username, password,signature=null){

    let user = await userRepository.getByUsername(username);
    let regionId = user? user.regionId: 1;
    let regionConfig = await getRegionConfig(regionId);
    const {rateLimiter,rateLimiterSign} = regionLimits(regionConfig)
    let limit = await rateLimiter.get(username);
    let signatureLimit
    if(signature)
    {
        signatureLimit= await rateLimiterSign.get(signature);
    }
    let remainingPoints = limit? limit.remainingPoints:2
    if((limit && limit.remainingPoints==0) || (signatureLimit && signatureLimit.remainingPoints==0))
    {
        throw new Error("Login limit exceeded")
    }
        
    if (!user) {
        await rateLimiter.consume(username, 1);
        if(signature)
        {
            await rateLimiterSign.consume(signature, 1);
        }
        throw new Error('Incorrect Email or Password. You have ' + limits.remainingPoints+ ' attempt(s) left');
    }

    let comparisonResult = await compare(password, user.password)
    if (comparisonResult == true) {
        await rateLimiter.delete(username);
        if(signature)
        {
            await rateLimiterSign.delete(signature, 1);
        }
        
        let token = await sign({ userName: user.userName},
            process.env.SECRET,
            { expiresIn: 60*15 });
        
        return token;
    }
    else {
        await rateLimiter.consume(username, 1);
        if(signature)
        {
            signatureLimit= await rateLimiterSign.get(signature);
        }
        throw new Error('Incorrect Username or Password. You have ' + remainingPoints + ' attempt(s) left');
       
    }
};
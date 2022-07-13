import * as userRepository from "./userRepository";
import {hash} from "bcrypt";
import verifyPassword from "./verifyPassword";
export default async function register(accountDetails,password)
{
    let verifyResult=verifyPassword(password)
    if(!verifyResult.verified)
    {
        throw new Error(verifyResult.message);
    }
    let user = await userRepository.getByUsername(accountDetails.userName);
    if (user)
    {
        throw new Error("Account already exists");
    }
    let hashedPassword = hash(password, 10)
    return await userRepository.create({userName:accountDetails.userName,password:hashedPassword});
}
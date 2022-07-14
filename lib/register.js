import RegionModel from "./repository/regionModel";
import * as userRepository from "./repository/userRepository";
import { copyFile, constants } from 'node:fs/promises';
import verifyPassword from "./verifyPassword";
import {hash} from "bcrypt";
import getRegionConfig from "./repository/configDAO";
export default async function register(accountDetails,password)
{
    let regionId = accountDetails.regionId ?? 1;
    let regionConfig = await getRegionConfig(regionId);
    let verifyResult = verifyPassword(password, regionConfig.passwordLength)
    if(!verifyResult.verified)
    {
        throw new Error(verifyResult.message);
    }
    let user = await userRepository.getByUsername(accountDetails.userName);
    if (user)
    {
        throw new Error("Account already exists");
    }
    
    /**
     * Assumes that profile is saved in temp location by api layer with a uuid as image name
     */
    let destinationPath ;
    if(accountDetails.profilePic)
    {
        destinationPath = `secure/${accountDetails.profilePic}`
        await copyFile(accountDetails.profilePic, );
    }
    let hashedPassword = await hash(password, 10);
    let createdUser = await userRepository.create({userName:accountDetails.userName,password:hashedPassword,regionId,profilePic:destinationPath});
    return createdUser;

}

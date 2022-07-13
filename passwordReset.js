import verifyPassword from "./verifyPassword";
import * as userRepository from "./userRepository"
export default function reset(userId,password){

    let verifyResult=verifyPassword(password)
    if(!verifyResult.verified)
    {
        throw new Error(verifyResult.message);
    }
    let user = userRepository.getByUsername(accountDetails.userName);
    if (!user)
    {
        throw new Error("User does not exist.");
    }
    let hashedPassword = hash(password, 10)
    userRepository.updatePassword(userId,hashedPassword);
}

    




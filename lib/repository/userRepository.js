import UserModel from "./userModel";

export async function getByUsername(username)
{
    return UserModel.query().findOne("username", username);
}

export async function create(user)
{
    let savedUser = await UserModel.query().insertAndFetch(user);
    delete savedUser.password;
    return savedUser;
}

export async function updatePassword(userId,password)
{
    return UserModel.query().patchAndFetchById(userId,{password});
}


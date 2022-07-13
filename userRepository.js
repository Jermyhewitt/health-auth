import UserModel from "./userModel";

export async function getByUsername(username)
{
    return UserModel.query().findOne("username", username);
}

export async function create(user)
{
    return UserModel.query().insertAndFetch(user);
}

export async function updatePassword(userId,password)
{
    return UserModel.query().patchAndFetchById(userId,{password});
}


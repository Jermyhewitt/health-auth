import jwt from 'jsonwebtoken';
import util from 'node:util';
import {login,register,authenticate} from "../index";
import * as bcrypt from "bcrypt";
import {getByUsername,create} from './repository/userRepository';
import getRegionConfig from "./repository/configDAO";
import UserModel from './repository/userModel'
let configs = {id:1, sessionLength:10,signatureTimer:10,userNameTimer:3,passwordLength:10};
beforeAll(async () => {
    await UserModel.query().delete();
  });
test('End to end test', async () => {
    let plainPassword = "@#equallyImportant6";
    let password = await bcrypt.hash(plainPassword, 10);
    const user = {userName: 'Bob',password};
    let createdUser = await register({userName:user.userName},plainPassword); 
    let token = await login("Bob",plainPassword); 
    let auth = await authenticate(token);
    expect(auth.userName).toEqual(createdUser.userName);
    expect(auth.exp).toBeGreaterThan(0)
     
});
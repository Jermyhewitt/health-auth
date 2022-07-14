import jwt from 'jsonwebtoken';
import util from 'node:util';
import {login,register,authenticate} from "../index";
import * as bcrypt from "bcrypt";
import {getByUsername,create} from './repository/userRepository';
import getRegionConfig from "./repository/configDAO";
jest.mock( "./repository/configDAO");
jest.mock('./repository/userRepository');
let configs = {id:1, sessionLength:10,signatureTimer:10,userNameTimer:3,passwordLength:10}

test('components integrate without error', async () => {
    let plainPassword = "@#equallyImportant6";
    let password = await bcrypt.hash(plainPassword, 10);
    const user = {id:1,userName: 'Bob',password};
    create.mockResolvedValue(user);
    getRegionConfig.mockResolvedValue(configs);
    let createdUser = await register({userName:user.name},plainPassword); 
    getByUsername.mockResolvedValue(user);
    let token = await login("Bob",plainPassword); 
    let auth = await authenticate(token);
    expect(auth.userName).toEqual(createdUser.userName);
    expect(auth.exp).toBeGreaterThan(0)
     
});
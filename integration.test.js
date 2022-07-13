import jwt from 'jsonwebtoken';
import util from 'node:util';
import {login,register,authenticate} from "./index";
import * as bcrypt from "bcrypt";
import {getByUsername,create} from './userRepository';

jest.mock('./userRepository');
test('components integrate without error', async () => {
    let plainPassword = "@#equallyImportant6";
    let password = await bcrypt.hash(plainPassword, 10);
    const user = {id:1,userName: 'Bob',password};
    create.mockResolvedValue(user);
    let createdUser = await register({userName:user.name},plainPassword); 
    getByUsername.mockResolvedValue(user);
    let token = await login("Bob",plainPassword); 
    let auth = await authenticate(token);
    expect(auth.userName).toEqual(createdUser.userName);
    expect(auth.exp).toBeGreaterThan(0)
     
});
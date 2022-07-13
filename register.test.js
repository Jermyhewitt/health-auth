import {register} from "./index";
import {create, getByUsername} from './userRepository';
import * as bcrypt from "bcrypt"; "bcrypt"

jest.mock('./userRepository');
test('successful register', async () => {
  let plainPassword = "@#equallyImportant6";
    let password = await bcrypt.hash(plainPassword, 10);
    const user = {id:1,name: 'Bob',password};
    create.mockResolvedValue(user);
    let createdUser = await register({userName:user.name},plainPassword); 
    expect(createdUser.name).toEqual(user.name);
    expect(createdUser.password).toEqual(password);   
  });

  test('register existing user', async () => {
      let plainPassword = "@#equallyImportant6";
      let password = await bcrypt.hash(plainPassword, 10);
      const user = {id:1,name: 'Bob',password};
      getByUsername.mockResolvedValue(user);
      try {
        await register({userName:user.name},plainPassword); 
      } catch (error) {
        expect(error.message).toMatch('exists');
      }  
    });

    test('register weak password', async () => {
      const user = {id:1,name: 'Bob',password:"test"};
      let plainPassword = "equallyImportant";
      try {
        let createdUser = await register({userName:user.name},plainPassword); 
      } catch (error) {
        expect(error.message).toMatch('Password must');
      }       
      });
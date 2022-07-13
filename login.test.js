import {login} from "./index";
import {getByUsername} from './userRepository';
import * as bcrypt from "bcrypt";

jest.mock('./userRepository');
test('successful login', async () => {
    let password = await bcrypt.hash("equallyImportant6", 10);
    const user = {id:1,name: 'Bob',password};
    getByUsername.mockResolvedValue(user);
    let token = await login("Bob","equallyImportant6"); 
    expect(token).toEqual(expect.any(String))     
  });

  test('login incorrect password', async () => {
    let password = await bcrypt.hash("equallyImportant6", 10);
    const user = {id:1,name: 'Bob',password};
    getByUsername.mockResolvedValue(user);
    try {
      let token = await login("Bob","equallyImportant8"); 
    } catch (error) {
      expect(error.message).toMatch('Incorrect Username ');
    }  
  });

  test('login incorrect username', async () => {
    let password = await bcrypt.hash("equallyImportant6", 10);
    const user = {id:1,name: 'Bob',password};
    getByUsername.mockResolvedValue(user);
    try {
      let token = await login("Bobby","equallyImportant8"); 
    } catch (error) {
      expect(error.message).toMatch('Incorrect Username ');
    }  
  });

  test('Too many failed Login', async () => {
    let password = await bcrypt.hash("equallyImportant6", 10);
    const user = {id:1,name: 'Bob',password};
    getByUsername.mockResolvedValue(user);
    for(let i=0;i<4;i++)
    {
      try {
        await login("Bob","equallyImportant8");
      } catch (error) {
        if(i==3)
        {
          expect(error.message).toMatch('limit exceeded'); 
        }
      }
    }
   
  });
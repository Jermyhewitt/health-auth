import {login} from "../index";
import {getByUsername} from './repository/userRepository';
import * as bcrypt from "bcrypt";
import getRegionConfig from "./repository/configDAO";

jest.mock('./repository/userRepository');
jest.mock( "./repository/configDAO");
jest.setTimeout(1000*60*60);

let configs = {id:1, sessionLength:10,signatureTimer:13,userNameTimer:3,passwordLength:10}

test('successful login', async () => {
    let password = await bcrypt.hash("equallyImportant6", 10);
    const user = {id:1,name: 'Bob',password};
    getByUsername.mockResolvedValue(user);
    getRegionConfig.mockResolvedValue(configs);
    let token = await login("Bob","equallyImportant6","sig",1); 
    expect(token).toEqual(expect.any(String))     
  });

  test('login incorrect password', async () => {
    let password = await bcrypt.hash("equallyImportant6", 10);
    const user = {id:1,name: 'Bob',password};
    getByUsername.mockResolvedValue(user);
    getRegionConfig.mockResolvedValue(configs);
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
    getRegionConfig.mockResolvedValue(configs);
    try {
      let token = await login("Bobby","equallyImportant8"); 
    } catch (error) {
      expect(error.message).toMatch('Incorrect Username ');
    }  
  });

  test('Too many failed username', async () => {
    let password = await bcrypt.hash("equallyImportant6", 10);
    const user = {id:1,name: 'Bob',password};
    getByUsername.mockResolvedValue(user);
    getRegionConfig.mockImplementation(() => Promise.resolve(configs));
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

  test('Too many failed signature', async () => {
  
    let password = await bcrypt.hash("equallyImportant6", 10);
    const user = {id:1,name: 'Bob',password};
    getByUsername.mockResolvedValue(user);
    getRegionConfig.mockImplementation(() => Promise.resolve(configs));
    for(let i=0;i<13;i++)
    {
      try {
        await login("Bobby"+i,"equallyImportant8","192.168.99.76:cookie:chrome",1);
      } catch (error) {
        if(i==13)
        {
          expect(error.message).toMatch('limit exceeded'); 
        }
      }
    }
   
  });
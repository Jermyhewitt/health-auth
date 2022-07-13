import jwt from 'jsonwebtoken';
import util from 'node:util';


export default async function authenticateToken(token) {
  if (token == null) return false;
  let verify = util.promisify(jwt.verify);
  try 
  {
    let decoded = await verify(token,process.env.SECRET);
    return decoded;
  } 
  catch (error) 
  {
    return false;
  }
}
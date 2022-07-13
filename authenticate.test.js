import {authenticate} from "./index";
import jwt from 'jsonwebtoken';
import util from 'node:util';
const sign = util.promisify(jwt.sign);

test('verify valid token', async () => {
    let user = { userName: "Bob"}
    let token = await sign(user,
        process.env.SECRET,
        { expiresIn: 60*15 });
    let auth = await authenticate(token);
    expect(auth.userName).toEqual(user.userName);
  });

  test('verify invalid token', async () => {
    let auth = await authenticate("5C^^i8G$8Vy8E5");
    expect(auth).toEqual(false);
  });
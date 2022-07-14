import { register } from "../index";
import { create, getByUsername } from './repository/userRepository';
import * as bcrypt from "bcrypt";

jest.mock('./repository/userRepository');
test('successful register', async () => {
  let plainPassword = "@#equallyImportant6";
  let password = await bcrypt.hash(plainPassword, 10);
  const user = { id: 1, name: 'Bob', password };
  create.mockResolvedValue(user);
  let createdUser = await register({ userName: user.name }, plainPassword);
  expect(createdUser.name).toEqual(user.name);
});

test('register existing user', async () => {
  let plainPassword = "@#equallyImportant6";
  let password = await bcrypt.hash(plainPassword, 10);
  const user = { id: 1, name: 'Bob', password };
  getByUsername.mockResolvedValue(user);
  try {
    await register({ userName: user.name }, plainPassword);
  } catch (error) {
    expect(error.message).toMatch('exists');
  }
});

test('register weak password', async () => {
  const user = { id: 1, name: 'Bob', password: "test" };
  let plainPassword = "equallyImportant";
  try {
    await register({ userName: user.name }, plainPassword);
  } catch (error) {
    expect(error.message).toMatch('Password must');
  }
});
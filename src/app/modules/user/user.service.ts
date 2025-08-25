import { TUser } from "./user.interface";
import UserModel from "./user.model";

const createUserIntoDb = async (payload: Partial<TUser>) => {
  const result = await UserModel.create(payload);
  return result;
};

const getAllUserFromDb = async () => {
  const result = await UserModel.find({});
  return result;
};

const userService = {
  createUserIntoDb,
  getAllUserFromDb,
};
export default userService;

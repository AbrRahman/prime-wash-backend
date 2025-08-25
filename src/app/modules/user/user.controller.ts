import catchAsync from "../../utils/catchAsync";
import status from "http-status";
import userService from "./user.service";

const createUser = catchAsync(async (req, res, next) => {
  const result = await userService.createUserIntoDb(req?.body);

  res.status(status.OK).json({
    success: true,
    message: "User create successfully",
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res, next) => {
  const result = await userService.getAllUserFromDb();

  res.status(status.OK).json({
    success: true,
    message: "Get all user successfully",
    data: result,
  });
});

const userController = {
  createUser,
  getAllUser,
};
export default userController;

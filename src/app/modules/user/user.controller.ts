import catchAsync from "../../utils/catchAsync";
import status from "http-status";
import userService from "./user.service";

const createUser = catchAsync(async (req, res, next) => {
  const result = await userService.createUserIntoDb(req?.body, req?.file);

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

// update user role base like user or admin
const getSingleUser = catchAsync(async (req, res, next) => {
  const id = req?.params?.id as string;
  const result = await userService.getSingleFromDb(id);
  res.status(status.OK).json({
    success: true,
    message: "Get user successfully",
    data: result,
  });
});
// update user role base like user or admin
const updateUser = catchAsync(async (req, res, next) => {
  const id = req?.params?.id as string;
  const result = await userService.updateUserIntoDB(req.body, id);
  res.status(status.OK).json({
    success: true,
    message: "User update successfully",
    data: result,
  });
});

// delete user
const deleteUser = catchAsync(async (req, res, next) => {
  const id = req?.params?.id as string;

  const result = await userService.deleteUserIntoDB(id);
  res.status(status.OK).json({
    success: true,
    message: "User delete successfully",
    data: result,
  });
});

const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
export default userController;

import catchAsync from "../../utils/catchAsync";
import authService from "./auth.service";
import config from "../../config";
import status from "http-status";

// user login with email and password
const loginUser = catchAsync(async (req, res, next) => {
  const payload = req?.body;
  const { accessToken, refreshToken } = await authService.loginUser(payload);
  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  res.status(status.OK).json({
    success: true,
    message: "Login successfully",
    data: {
      accessToken,
    },
  });
});

// handle google login user
const googleLogin = catchAsync(async (req, res, next) => {
  const payload = req?.body;
  const { accessToken, refreshToken } = await authService.googleLogin(payload);
  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });
  res.status(status.OK).json({
    success: true,
    message: "Login successfully",
    data: {
      accessToken,
    },
  });
});

// create refresh token to access token
const refreshTokenToAccessToken = catchAsync(async (req, res, next) => {
  const refreshToken = req?.cookies?.refreshToken;
  const accessToken = await authService.refreshToken(refreshToken);
  res.status(status.OK).json({
    success: true,
    message: "Access token create successfully",
    data: {
      accessToken,
    },
  });
});

// password change
// update user profile
const passwordChange = catchAsync(async (req, res, next) => {
  const id = req?.user?._id as string;
  const result = await authService.passwordChange(
    id,
    req?.body?.password,
    req?.body?.oldPassword
  );
  let success = true;
  let message = "Password change successfully";

  if (!result) {
    success = false;
    message = "Password change failed";
  }

  res.status(status.OK).json({
    success,
    message,
    data: result,
  });
});

// get user profile
const getUserProfile = catchAsync(async (req, res, next) => {
  const id = req?.user?._id as string;
  const result = await authService.getUserProfileFromBB(id);
  let success = true;
  let message = "Get user profile successfully";

  if (!result) {
    success = false;
    message = "Get user profile failed";
  }

  res.status(status.OK).json({
    success,
    message,
    data: result,
  });
});

// update user profile
const updateProfile = catchAsync(async (req, res, next) => {
  const id = req?.user?._id as string;
  const result = await authService.updateUserProfileIntoDB(
    id,
    req?.file,
    req?.body
  );
  let success = true;
  let message = "Update profile successfully";

  if (!result) {
    success = false;
    message = "Update profile failed";
  }

  res.status(status.OK).json({
    success,
    message,
    data: result,
  });
});

const authController = {
  loginUser,
  refreshTokenToAccessToken,
  googleLogin,
  passwordChange,
  getUserProfile,
  updateProfile,
};
export default authController;

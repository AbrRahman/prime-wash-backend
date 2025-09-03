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

const authController = {
  loginUser,
  refreshTokenToAccessToken,
  googleLogin,
};
export default authController;

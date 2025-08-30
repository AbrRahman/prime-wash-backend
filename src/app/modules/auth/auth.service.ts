import status from "http-status";
import AppError from "../../errors/appError";
import UserModel from "../user/user.model";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utlis";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";

// handle email password logic
const loginUser = async (payload: { email: string; password: string }) => {
  const user = await UserModel.findOne({ email: payload.email }).select(
    "+password"
  );

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized user");
  }

  if (user.isDelete) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized user");
  }
  const match = await bcrypt.compare(
    payload?.password,
    user?.password as string
  );
  console.log(match);
  if (!match) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized user");
  }

  const jwt_payload = {
    _id: user?._id,
    email: user?.email,
    role: user?.role,
  };
  const access_token_secret = config.jwt_access_secret as string;
  const access_token_expires = config.jwt_access_exp_time as string;
  const refresh_token_secret = config.jwt_refresh_secret as string;
  const refresh_token_expires = config.jwt_refresh_exp_time as string;
  const accessToken = await createToken(
    jwt_payload,
    access_token_secret,
    access_token_expires
  );
  const refreshToken = await createToken(
    jwt_payload,
    refresh_token_secret,
    refresh_token_expires
  );

  return {
    accessToken,
    refreshToken,
  };
};

// generate access token to refresh token
const refreshToken = async (refreshToken: string) => {
  const token = refreshToken;
  if (!token) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized user");
  }
  const decode = (await jwt.verify(
    token,
    config.jwt_refresh_secret as string
  )) as JwtPayload;

  if (!decode) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized user");
  }

  const isUserExist = await UserModel.findOne({ email: decode?.email });
  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User is not found");
  }
  if (isUserExist?.isDelete) {
    throw new AppError(status.NOT_FOUND, "User is not found");
  }

  const dataPayload = {
    _id: isUserExist?._id,
    email: isUserExist?.email,
    role: isUserExist?.role,
  };
  const access_secret = config.jwt_access_secret as string;
  const access_token_expires = config.jwt_access_exp_time as string;
  const accessToken = await createToken(
    dataPayload,
    access_secret,
    access_token_expires
  );
  return accessToken;
};

const authService = {
  loginUser,
  refreshToken,
};

export default authService;

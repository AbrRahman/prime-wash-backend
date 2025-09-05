import status from "http-status";
import AppError from "../../errors/appError";
import UserModel from "../user/user.model";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utlis";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TUser } from "../user/user.interface";
import { uploadImageCloudinary } from "../../utils/handleImageUpload";

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

// handle google login user
const googleLogin = async (payload: {
  name: string;
  email: string;
  image: string;
}) => {
  const user = await UserModel.findOne({ email: payload.email });

  let newUser;

  if (!user) {
    newUser = await UserModel.create(payload);
  }

  if (!newUser) {
    newUser = user;
  }

  if (newUser && newUser?.isDelete) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized user");
  }

  const jwt_payload = {
    _id: newUser?._id,
    email: newUser?.email,
    role: newUser?.role,
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

// password change
const passwordChange = async (
  userId: string,
  password: string,
  oldPassword: string
) => {
  const user = await UserModel.findById(userId).select("+password");
  const match = await bcrypt.compare(oldPassword, user?.password as string);
  console.log(match);
  if (match) {
    const result = UserModel.findByIdAndUpdate(
      userId,
      { password: password },
      {
        new: true,
        runValidators: true,
      }
    );
    return result;
  }
  return false;
};

// get user profile
const getUserProfileFromBB = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};

// update user profile
const updateUserProfileIntoDB = async (
  id: string,
  file: any,
  payload: Partial<TUser>
) => {
  let newProfile = payload;
  if (file?.path && file?.fieldname) {
    const { path, fieldname } = file;
    // upload into cloudinary
    const upload_url = await uploadImageCloudinary(path, fieldname);
    const secure_url = upload_url?.secure_url as string;
    newProfile = {
      image: secure_url,
      ...payload,
    };
  }

  const result = await UserModel.findByIdAndUpdate(id, newProfile, {
    runValidators: true,
    new: true,
  });
  return result;
};

const authService = {
  loginUser,
  refreshToken,
  googleLogin,
  getUserProfileFromBB,
  updateUserProfileIntoDB,
  passwordChange,
};

export default authService;

import config from "../config";
import AppError from "../errors/appError";
import catchAsync from "../utils/catchAsync";
import Jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../modules/user/user.model";
import status from "http-status";

type TUserRole = "user" | "admin";

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const accessToken = req?.headers.authorization as string;
    const token = accessToken?.split(" ")[1];
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, "Unauthorized user");
    }
    const decode = (await Jwt.verify(
      token,
      config.jwt_access_secret as string
    )) as JwtPayload;
    const user = await UserModel.findOne({ email: decode?.email });

    if (!user) {
      throw new AppError(status.UNAUTHORIZED, "Unauthorized user");
    }

    if (user.isDelete) {
      throw new AppError(status.UNAUTHORIZED, "Unauthorized user");
    }
    if (requiredRole && !requiredRole.includes(user.role)) {
      throw new AppError(status.UNAUTHORIZED, "Unauthorized user");
    }
    req.user = decode as JwtPayload;

    next();
  });
};

export default auth;

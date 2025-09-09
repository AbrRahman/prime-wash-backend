import config from "../config";
import UserModel from "../modules/user/user.model";

const superUser = {
  name: "Ab Rahman",
  email: config.super_user_email,
  address: "Dhaka,Bangladesh",
  phone: "",
  image:
    "https://res.cloudinary.com/dmhfrwdq3/image/upload/v1757393705/user_8895458_f5usma.png",
  password: config.super_user_password,
  role: "admin",
};

const seedSuperAdmin = async () => {
  const isSuperAdminExits = await UserModel.findOne({
    email: config.super_user_email,
  });

  if (!isSuperAdminExits) {
    await UserModel.create(superUser);
  }
};

export default seedSuperAdmin;

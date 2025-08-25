export type TUser = {
  name: string;
  email: string;
  image: string;
  password?: string;
  phone?: string;
  address?: string;
  role: "user" | "admin";
  isDelete: boolean;
};

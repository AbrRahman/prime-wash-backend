import express from "express";
import userRouter from "../modules/user/user.routes";
const router = express.Router();

const moduleRouter = [
  {
    path: "/user",
    route: userRouter,
  },
];

moduleRouter.forEach(({ path, route }) => router.use(path, route));

export default router;

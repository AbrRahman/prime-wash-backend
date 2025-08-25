import express from "express";
import userRouter from "../modules/user/user.routes";
import serviceRouter from "../modules/service/service.routes";
import slotRouter from "../modules/slot/slot.routes";
const router = express.Router();

const moduleRouter = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/service",
    route: serviceRouter,
  },
  {
    path: "/slot",
    route: slotRouter,
  },
];

moduleRouter.forEach(({ path, route }) => router.use(path, route));

export default router;

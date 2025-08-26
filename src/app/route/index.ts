import express from "express";
import userRouter from "../modules/user/user.routes";
import serviceRouter from "../modules/service/service.routes";
import slotRouter from "../modules/slot/slot.routes";
import bookingRouter from "../modules/booking/booking.routes";
import reviewRouter from "../modules/review/review.routes";
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
  {
    path: "/booking",
    route: bookingRouter,
  },
  {
    path: "/review",
    route: reviewRouter,
  },
];

moduleRouter.forEach(({ path, route }) => router.use(path, route));

export default router;

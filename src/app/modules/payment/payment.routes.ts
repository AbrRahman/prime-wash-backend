import express from "express";
import paymentController from "./payment.controller";
import auth from "../../middleware/auth";
const router = express.Router();

router.post("/", auth("admin", "user"), paymentController.createPaymentUrl);
router.post(
  "/success",
  auth("admin", "user"),
  paymentController.paymentSuccessCallback
);
router.get(
  "/fail",
  auth("admin", "user"),
  paymentController.paymentFailCallback
);
router.get(
  "/cancel",
  auth("admin", "user"),
  paymentController.paymentCancelCallback
);

const paymentRouter = router;
export default paymentRouter;

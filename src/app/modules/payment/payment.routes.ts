import express from "express";
import paymentController from "./payment.controller";
import auth from "../../middleware/auth";
const router = express.Router();

router.post("/", auth("admin", "user"), paymentController.createPaymentUrl);
router.post("/success", paymentController.paymentSuccessCallback);
router.get("/fail", paymentController.paymentFailCallback);
router.get("/cancel", paymentController.paymentCancelCallback);

const paymentRouter = router;
export default paymentRouter;

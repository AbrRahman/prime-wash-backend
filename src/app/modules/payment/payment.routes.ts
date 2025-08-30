import express from "express";
import paymentController from "./payment.controller";
const router = express.Router();

router.post("/", paymentController.createPaymentUrl);
router.post("/success", paymentController.paymentSuccessCallback);
router.get("/fail", paymentController.paymentFailCallback);
router.get("/cancel", paymentController.paymentCancelCallback);

const paymentRouter = router;
export default paymentRouter;

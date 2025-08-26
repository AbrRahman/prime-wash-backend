import express from "express";
import bookingController from "./booking.controller";

const router = express.Router();

// booking router
router.post("/", bookingController.insertBooking);

const bookingRouter = router;
export default bookingRouter;

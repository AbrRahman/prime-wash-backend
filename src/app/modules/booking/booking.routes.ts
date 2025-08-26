import express from "express";
import bookingController from "./booking.controller";

const router = express.Router();

// booking router
router.post("/", bookingController.insertBooking);

// get all booking by admin route
router.get("/", bookingController.getAllBooking);

// get login uer booking and upcoming booking
router.get("/my-booking", bookingController.getUserAllBooking);
router.get("/my-upcoming-booking", bookingController.getUserUpcomingBooking);

const bookingRouter = router;
export default bookingRouter;

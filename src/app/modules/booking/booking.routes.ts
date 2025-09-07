import express from "express";
import bookingController from "./booking.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// booking router
router.post("/", bookingController.insertBooking);

// get all booking by admin route
router.get("/", bookingController.getAllBooking);

// get login uer booking and upcoming booking
router.get(
  "/my-booking",
  auth("admin", "user"),
  bookingController.getUserAllBooking
);
router.get(
  "/my-upcoming-booking",
  auth("admin", "user"),
  bookingController.getUserUpcomingBooking
);

// unpaid booking delete route
router.delete("/unpaid", bookingController.deleteUnpaidBooking);

const bookingRouter = router;
export default bookingRouter;

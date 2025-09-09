import express from "express";
import bookingController from "./booking.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// booking router
router.post("/", auth("admin", "user"), bookingController.insertBooking);

// get all booking by admin route
router.get("/", auth("admin"), bookingController.getAllBooking);

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
router.delete(
  "/unpaid",
  auth("admin", "user"),
  bookingController.deleteUnpaidBooking
);
// delete a booking by admin
router.delete("/:id", auth("admin"), bookingController.deleteBooking);

const bookingRouter = router;
export default bookingRouter;

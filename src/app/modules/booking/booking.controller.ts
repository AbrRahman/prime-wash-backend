import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { success } from "zod";
import bookingService from "./booking.service";

// create booking controller
const insertBooking = catchAsync(async (req, res, next) => {
  const result = await bookingService.insertBookingIntoDB(req?.body);
  let success = true;
  let message = "Successfully Booking";
  if (!result) {
    (success = false), (message = "Booking failed");
  }
  res.status(status.OK).json({
    success: success,
    message: message,
    data: result,
  });
});

// get all booking by admin controller
const getAllBooking = catchAsync(async (req, res, next) => {
  const result = await bookingService.getAllBookingFromDB();
  res.status(status.OK).json({
    success: true,
    message: "Get all booking successfully",
    data: result,
  });
});
const getUserAllBooking = catchAsync(async (req, res, next) => {
  const userId = req.body?.user;
  const result = await bookingService.getUserAllBookingFromDB(userId);
  res.status(status.OK).json({
    success: true,
    message: "Get my booking booking successfully",
    data: result,
  });
});
const getUserUpcomingBooking = catchAsync(async (req, res, next) => {
  const userId = req.body?.user;
  const result = await bookingService.getUserAllUpcomingBookingFromDB(userId);
  res.status(status.OK).json({
    success: true,
    message: "Get my upcoming booking successfully",
    data: result,
  });
});

// delete unpaid booking delete
const deleteUnpaidBooking = catchAsync(async (req, res, next) => {
  const result = await bookingService.deleteUnpaidBookingFromDB();
  res.status(status.OK).json({
    success: true,
    message: "Delete unpaid booking successfully",
  });
});

const bookingController = {
  insertBooking,
  getAllBooking,
  getUserAllBooking,
  getUserUpcomingBooking,
  deleteUnpaidBooking,
};
export default bookingController;

import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { success } from "zod";
import bookingService from "./booking.service";

// create booking controller
const insertBooking = catchAsync(async (req, res, next) => {
  const result = await bookingService.insertBookingIntoDB(req?.body);
  res.status(status.OK).json({
    success: true,
    message: "Successfully booking",
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
    message: "Get my upcoming booking booking successfully",
    data: result,
  });
});

const bookingController = {
  insertBooking,
  getAllBooking,
  getUserAllBooking,
  getUserUpcomingBooking,
};
export default bookingController;

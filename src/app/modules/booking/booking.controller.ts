import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { success } from "zod";
import bookingService from "./booking.service";

const insertBooking = catchAsync(async (req, res, next) => {
  const result = await bookingService.insertBookingIntoDB(req?.body);
  res.status(status.OK).json({
    success: true,
    message: "Successfully booking",
    data: result,
  });
});

const bookingController = {
  insertBooking,
};
export default bookingController;

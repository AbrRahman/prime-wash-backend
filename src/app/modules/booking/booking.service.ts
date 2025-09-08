import mongoose from "mongoose";
import SlotModel from "../slot/slot.model";
import TBooking from "./booking.interface";
import BookingModel from "./booking.model";
import filterUpcomingBooking from "../../utils/filterUpcomingBooking";
import status from "http-status";
import AppError from "../../errors/appError";

// booking service database
const insertBookingIntoDB = async (payload: Partial<TBooking>) => {
  const session = await mongoose.startSession();

  try {
    const slot = await SlotModel.findById(payload.slot);
    if (slot?.isBooked == "booked") {
      throw new Error("This slot already booked");
    }
    session.startTransaction();
    // at first slot model this slot status make booked

    await SlotModel.findByIdAndUpdate(
      payload.slot,
      {
        isBooked: "booked",
      },
      { session }
    );

    //   save ths booking data db
    const newBooking = new BookingModel(payload);
    const result = (await newBooking.save({ session })).toObject();
    await session.commitTransaction();
    session.endSession();

    // generate payment url

    return result;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(err as any);
  }
};

// get all booking by admin
const getAllBookingFromDB = async () => {
  const result = await BookingModel.find({})
    .populate("customer")
    .populate("service")
    .populate("slot");
  return result;
};

// get user booking service
const getUserAllBookingFromDB = async (userId: string) => {
  const result = await BookingModel.find({ customer: userId })
    .populate("user")
    .populate("service")
    .populate("slot");
  return result;
};
const getUserAllUpcomingBookingFromDB = async (userId: string) => {
  const booking = await BookingModel.find({ customer: userId })
    .populate("service")
    .populate("slot");
  const result = await filterUpcomingBooking(booking);
  return result;
};

// delete unpaid booking
const deleteUnpaidBookingFromDB = async () => {
  const result = await BookingModel.findOneAndDelete({
    paymentStatus: "unpaid",
  });
  if (!result) {
    throw new AppError(status.BAD_REQUEST, "No unpaid booking found");
  }
  const slot = await SlotModel.findByIdAndUpdate(
    result?.slot,
    {
      isBooked: "available",
    },
    {
      runValidators: true,
      new: true,
    }
  );
  if (!slot) {
    throw new AppError(status.BAD_GATEWAY, "No update available slot");
  }
  return true;
};

// delete a booking by admin
const deleteBookingIntoDB = async (id: string) => {
  const result = await BookingModel.findByIdAndDelete(id);
  return result;
};

const bookingService = {
  insertBookingIntoDB,
  getAllBookingFromDB,
  getUserAllBookingFromDB,
  getUserAllUpcomingBookingFromDB,
  deleteUnpaidBookingFromDB,
  deleteBookingIntoDB,
};
export default bookingService;

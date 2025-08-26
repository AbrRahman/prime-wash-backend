import mongoose from "mongoose";
import SlotModel from "../slot/slot.model";
import TBooking from "./booking.interface";
import BookingModel from "./booking.model";
import filterUpcomingBooking from "../../utils/filterUpcomingBooking";

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
    session.commitTransaction();
    session.endSession();

    return result;
  } catch (err) {
    session.abortTransaction();
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
    .populate("service")
    .populate("slot");
  return result;
};
const getUserAllUpcomingBookingFromDB = async (userId: string) => {
  const booking = await BookingModel.find({ customer: userId }).populate(
    "slot"
  );
  const result = await filterUpcomingBooking(booking);
  return result;
};

const bookingService = {
  insertBookingIntoDB,
  getAllBookingFromDB,
  getUserAllBookingFromDB,
  getUserAllUpcomingBookingFromDB,
};
export default bookingService;

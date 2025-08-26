import mongoose from "mongoose";
import SlotModel from "../slot/slot.model";
import TBooking from "./booking.interface";
import BookingModel from "./booking.model";

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

const bookingService = {
  insertBookingIntoDB,
};
export default bookingService;

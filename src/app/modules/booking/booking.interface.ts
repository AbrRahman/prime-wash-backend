import { Types } from "mongoose";

type TBooking = {
  customer: Types.ObjectId;
  service: Types.ObjectId;
  slot: Types.ObjectId;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  registrationPlate: string;
  paymentStatus: "paid" | "unpaid";
};

export default TBooking;

import { Types } from "mongoose";

type TSlot = {
  service: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked";
};

export default TSlot;

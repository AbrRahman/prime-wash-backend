import { Types } from "mongoose";

export interface ISlot {
  date: string;
  startTime: string;
}

const filterSlot = (slots: any) => {
  const now = new Date();

  const result = slots.filter((slot: any) => {
    const [hour, minute] = slot?.startTime.split(":").map(Number);
    const slotDate = new Date(slot?.date);
    slotDate.setHours(hour, minute - 20, 0, 0);

    return slotDate >= now;
  });
  return result;
};

export default filterSlot;

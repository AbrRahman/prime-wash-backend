import { Types } from "mongoose";

const generateServiceSlot = (
  startTime: string,
  endTime: string,
  duration: number,
  serviceIs: Types.ObjectId,
  date: string
) => {
  const [startHours, startMinute] = startTime.split(":").map(Number);
  const [endHours, endMinute] = endTime.split(":").map(Number);

  //   calculate total start minute and end minute
  let totalStartMinute = startHours! * 60 + startMinute!;
  const totalEndMinute = endHours! * 60 + endMinute!;

  //   calculate teh number of slot
  const totalSlot = Math.floor((totalEndMinute - totalStartMinute) / duration);

  //   generate slot
  let slot = [];

  for (let i = 1; i <= totalSlot; i++) {
    // like 09:00 start time generate
    const startSlotTime = `${Math.floor(totalStartMinute / 60)
      .toString()
      .padStart(2, "0")}:${(totalStartMinute % 60)
      .toString()
      .padStart(2, "0")}`;

    //   like 9:30 end time generate
    const endSlotTime = `${Math.floor((totalStartMinute + duration) / 60)
      .toString()
      .padStart(2, "0")}:${((totalStartMinute + duration) % 60)
      .toString()
      .padStart(2, "0")}`;

    slot.push({
      service: serviceIs,
      startTime: startSlotTime,
      endTime: endSlotTime,
      date: date,
    });

    totalStartMinute += duration;
  }
  return slot;
};

export default generateServiceSlot;

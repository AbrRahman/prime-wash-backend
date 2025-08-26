import { Types } from "mongoose";

export interface ISlot {
  date: string;
  startTime: string;
}

export interface IBookingProps {
  slot: ISlot;
}

const filterUpcomingBooking = (booking: any) => {
  const now = new Date();

  const futureBooking = booking.filter((item: any) => {
    const [hour, minute] = item?.slot?.startTime.split(":").map(Number);
    const slotDate = new Date(item?.slot?.date);
    slotDate.setHours(hour, minute, 0, 0);

    return slotDate >= now;
  });
  return futureBooking;
};

export default filterUpcomingBooking;

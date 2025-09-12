import status from "http-status";
import AppError from "../../errors/appError";
import generateServiceSlot from "../../utils/generateServiceSlot";
import ServiceModel from "../service/service.model";
import TSlot from "./slot.interface";
import SlotModel from "./slot.model";
import { date } from "zod";
import filterSlot from "../../utils/filterSlot";

const createSlotIntoDB = async (payload: Partial<TSlot>) => {
  const service = await ServiceModel.findById(payload?.service);
  if (!service) return null;
  //   generate slot data
  const slot = await generateServiceSlot(
    payload.startTime!,
    payload.endTime!,
    Number(service?.duration),
    payload.service!,
    payload.date!
  );

  //   save into db
  const result = await SlotModel.create(slot);
  if (!result?.length) {
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Slot create failed");
  }
  return result;
};

// get all slot
const getAllSlotFromDB = async (query: Record<string, unknown>) => {
  let givenDate = "";
  const today = new Date();
  let filterQuery: any = {};
  if (query.serviceId) {
    filterQuery.service = query.serviceId;
  }
  if (query.date) {
    filterQuery.date = query.date;
    givenDate = new Date(query.date as string).toDateString();
  }
  const result = await SlotModel.find(filterQuery)
    .populate("service")
    .sort({ startTime: 1 });

  //  filter by result today upper 10 minute

  if (givenDate === today.toDateString() && result?.length) {
    return await filterSlot(result);
  } else {
    return result;
  }
};

// get single slot by slotId;
const getSingleSlotFromDB = async (id: string) => {
  const result = await SlotModel.findById(id);
  return result;
};

// delete a slot
const updateSlotIntoDB = async (payload: { isBooked: string }, id: string) => {
  const result = await SlotModel.findByIdAndUpdate(id, payload);
  return result;
};
// delete a slot
const deleteSlotIntoDB = async (id: string) => {
  const result = await SlotModel.findByIdAndDelete(id);
  return result;
};

const slotService = {
  createSlotIntoDB,
  getAllSlotFromDB,
  getSingleSlotFromDB,
  updateSlotIntoDB,
  deleteSlotIntoDB,
};

export default slotService;

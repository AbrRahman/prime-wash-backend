import generateServiceSlot from "../../utils/generateServiceSlot";
import ServiceModel from "../service/service.model";
import TSlot from "./slot.interface";
import SlotModel from "./slot.model";

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

  return result;
};

// get all slot
const getAllSlotFromDB = async (query: Record<string, unknown>) => {
  let filterQuery: any = {};
  if (query.serviceId) {
    filterQuery.service = query.serviceId;
  }
  if (query.date) {
    filterQuery.date = query.date;
  }
  const result = await SlotModel.find(filterQuery);
  return result;
};

const slotService = {
  createSlotIntoDB,
  getAllSlotFromDB,
};

export default slotService;

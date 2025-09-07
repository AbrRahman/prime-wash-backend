import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import slotService from "./slot.service";

// create slot controller
const createSlot = catchAsync(async (req, res, next) => {
  const result = await slotService.createSlotIntoDB(req.body);
  res.status(status.OK).json({
    success: true,
    message: "Slot create success successfully",
    data: result,
  });
});

// get all slot controller
const getAllSlot = catchAsync(async (req, res, next) => {
  const result = await slotService.getAllSlotFromDB(req?.query);
  res.status(status.OK).json({
    success: true,
    message: "Get all slot successfully",
    data: result,
  });
});

// get single slot by slot id
const getSingleSlot = catchAsync(async (req, res, next) => {
  const id = req.params?.id as string;
  const result = await slotService.getSingleSlotFromDB(id);
  res.status(status.OK).json({
    success: true,
    message: "Get all slot successfully",
    data: result,
  });
});

// update slot booking status
const updateSlot = catchAsync(async (req, res, next) => {
  const id = req?.params?.id as string;
  const result = await slotService.updateSlotIntoDB(req?.body, id);
  res.status(status.OK).json({
    success: true,
    message: "Delete slot successfully",
    data: result,
  });
});
// delete a slot
const deleteSlot = catchAsync(async (req, res, next) => {
  const id = req?.params?.id as string;
  const result = await slotService.deleteSlotIntoDB(id);
  res.status(status.OK).json({
    success: true,
    message: "Delete slot successfully",
    data: result,
  });
});

const slotController = {
  createSlot,
  getAllSlot,
  getSingleSlot,
  updateSlot,
  deleteSlot,
};

export default slotController;

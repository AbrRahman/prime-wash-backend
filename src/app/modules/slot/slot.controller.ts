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

const slotController = {
  createSlot,
  getAllSlot,
};

export default slotController;

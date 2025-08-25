import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import slotService from "./slot.service";

const createSlot = catchAsync(async (req, res, next) => {
  const result = await slotService.createSlotIntoDB(req.body);
  res.status(status.OK).json({
    success: true,
    message: "Slot create success successfully",
    data: result,
  });
});

const slotController = {
  createSlot,
};

export default slotController;

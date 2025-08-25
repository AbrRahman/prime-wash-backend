import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import serviceService from "./service.service";

const createService = catchAsync(async (req, res, next) => {
  const result = await serviceService.insertServiceIntoDB(req?.body, req.file);
  res.status(status.OK).json({
    success: true,
    message: "Service create successfully",
    data: result,
  });
});

const serviceController = {
  createService,
};
export default serviceController;

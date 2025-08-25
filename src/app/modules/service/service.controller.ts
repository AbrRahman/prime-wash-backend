import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import serviceService from "./service.service";

// insert service controller
const createService = catchAsync(async (req, res, next) => {
  const result = await serviceService.insertServiceIntoDB(req?.body, req.file);
  res.status(status.OK).json({
    success: true,
    message: "Service create successfully",
    data: result,
  });
});

// get all service controller
const getAllService = catchAsync(async (req, res, next) => {
  const result = await serviceService.getAllServiceFromDB(req?.query);
  res.status(status.OK).json({
    success: true,
    message: "Get all services successfully",
    data: result,
  });
});

// get single service controller
const getSingleService = catchAsync(async (req, res, next) => {
  const serviceId = req?.params?.id as string;
  const result = await serviceService.getSingleServiceFromDB(serviceId);
  res.status(status.OK).json({
    success: true,
    message: "Get service successfully",
    data: result,
  });
});

// update service controller
const updateService = catchAsync(async (req, res, next) => {
  const serviceId = req?.params?.id as string;
  const result = await serviceService.updateServiceIntoDB(req?.body, serviceId);
  res.status(status.OK).json({
    success: true,
    message: "Update service successfully",
    data: result,
  });
});

// soft delete service controller
const deleteService = catchAsync(async (req, res, next) => {
  const serviceId = req?.params?.id as string;
  const result = await serviceService.deleteServiceIntoB(serviceId);
  res.status(status.OK).json({
    success: true,
    message: "Service delete successfully",
    data: result,
  });
});

const serviceController = {
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
};
export default serviceController;

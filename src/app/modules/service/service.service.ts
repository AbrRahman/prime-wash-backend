import { uploadImageCloudinary } from "../../utils/handleImageUpload";
import TService from "./service.interface";
import ServiceModel from "./service.model";

// insert service into db
const insertServiceIntoDB = async (payload: Partial<TService>, file: any) => {
  const { path, fieldname } = file;
  // upload into cloudinary
  const upload_url = await uploadImageCloudinary(path, fieldname);
  const secure_url = upload_url?.secure_url as string;
  let newService = new ServiceModel({
    ...payload,
    image: secure_url,
  });
  const result = await newService.save();
  return result;
};

// get all service form db
const getAllServiceFromDB = async (query: Record<string, unknown>) => {
  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchableFiled = ["name", "description"];
  const searchQuery = ServiceModel.find({
    $or: searchableFiled.map((filed) => ({
      [filed]: { $regex: searchTerm, $options: "i" },
    })),
  });

  //   filter by duration link duration=30;
  let duration = {};
  if (query?.duration) {
    duration = { duration: query?.duration as string };
  }
  const filterQuery = searchQuery.find(duration);

  // filter by price range;
  let rangeQuery = {};
  if (query.maxPrice) {
    rangeQuery = { price: { $lte: Number(query?.maxPrice) } };
  }
  const filterByPriceQuery = filterQuery.find(rangeQuery);

  // sort query
  let sort = "-createdAt";
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = await filterByPriceQuery.sort(sort);

  return sortQuery;
};

// get single service from db
const getSingleServiceFromDB = async (serviceId: string) => {
  const result = await ServiceModel.findById(serviceId);
  return result;
};

// update service into db
const updateServiceIntoDB = async (
  payload: Partial<TService>,
  serviceId: string
) => {
  const result = await ServiceModel.findByIdAndUpdate(serviceId, payload, {
    runValidators: true,
    new: true,
  });
  return result;
};

// service soft delete into db
const deleteServiceIntoB = async (serviceId: string) => {
  const result = await ServiceModel.findByIdAndUpdate(
    serviceId,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

const serviceService = {
  insertServiceIntoDB,
  getAllServiceFromDB,
  getSingleServiceFromDB,
  updateServiceIntoDB,
  deleteServiceIntoB,
};

export default serviceService;

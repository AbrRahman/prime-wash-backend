import { uploadImageCloudinary } from "../../utils/handleImageUpload";
import TService from "./service.interface";
import ServiceModel from "./service.model";

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

const serviceService = {
  insertServiceIntoDB,
};

export default serviceService;

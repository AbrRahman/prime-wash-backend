import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import config from "../config";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name!,
  api_key: config.cloudinary_api_key!,
  api_secret: config.cloudinary_api_secret!,
});

// upload image cloudinary
export const uploadImageCloudinary = async (path: string, filename: string) => {
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: filename,
    })
    .catch((error) => {
      console.log(error);
    });
  fs.unlink(path, (err) => {
    if (err) {
      console.log(err);
    } else {
      //   console.log('File is deleted.');
    }
  });
  return uploadResult;
};

// upload image using multer
const folderPath = path.join(process.cwd(), "uploads");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLocaleLowerCase()
        .split(" ")
        .join("_") +
      "_" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});

export const upload = multer({ storage: storage });

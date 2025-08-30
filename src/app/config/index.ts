import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_connection_ser: process.env.DB_CONNECTION_STR,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_exp_time: process.env.JWT_ACCESS_EXP_TIME,
  jwt_refresh_exp_time: process.env.JWT_REFRESH_EXP_TIME,
  client_url: process.env.CLIENT_URL,
  aamrpay_base_url: process.env.AAMARPAY_BASE,
  aamarpay_store_id: process.env.AAMARPAY_STORE_ID,
  aamarpay_signature_key: process.env.AAMARPAY_SIGNATURE_KEY,
  base_url: process.env.BASE_URL,
};

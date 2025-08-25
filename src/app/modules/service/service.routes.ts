import express from "express";
import { upload } from "../../utils/handleImageUpload";
import validationRequest from "../../middleware/validationRequest";
import serviceValidation from "./service.validation";
import serviceController from "./service.controller";
const router = express.Router();

// create service into db
router.post(
  "/",
  upload.single("file"),
  validationRequest(serviceValidation.createServiceValidationSchema),
  serviceController.createService
);

const serviceRouter = router;
export default serviceRouter;

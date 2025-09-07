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
// get all service
router.get("/", serviceController.getAllService);
// get single service
router.get("/:id", serviceController.getSingleService);

// update service
router.patch(
  "/:id",
  upload.single("file"),
  validationRequest(serviceValidation.updateServiceValidationSchema),
  serviceController.updateService
);

// delete service
router.delete("/:id", serviceController.deleteService);

const serviceRouter = router;
export default serviceRouter;

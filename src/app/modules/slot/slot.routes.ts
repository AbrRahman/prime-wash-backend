import express from "express";
import slotController from "./slot.controller";
import validationRequest from "../../middleware/validationRequest";
import slotValidation from "./slot.validation";

const router = express.Router();

// create slot route
router.post(
  "/",
  validationRequest(slotValidation.createSlotValidationSchema),
  slotController.createSlot
);

// get all slot route
router.get("/", slotController.getAllSlot);

const slotRouter = router;
export default slotRouter;

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

// get single slot by slotId
router.get("/:id", slotController.getSingleSlot);

// delete a slot
router.put("/:id", slotController.updateSlot);
// delete a slot
router.delete("/:id", slotController.deleteSlot);

const slotRouter = router;
export default slotRouter;

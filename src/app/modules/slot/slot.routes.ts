import express from "express";
import slotController from "./slot.controller";
import validationRequest from "../../middleware/validationRequest";
import slotValidation from "./slot.validation";
import auth from "../../middleware/auth";

const router = express.Router();

// create slot route
router.post(
  "/",
  auth("admin"),
  validationRequest(slotValidation.createSlotValidationSchema),
  slotController.createSlot
);

// get all slot route
router.get("/", slotController.getAllSlot);

// get single slot by slotId
router.get("/:id", slotController.getSingleSlot);

// update a slot
router.put("/:id", auth("admin"), slotController.updateSlot);
// delete a slot
router.delete("/:id", auth("admin"), slotController.deleteSlot);

const slotRouter = router;
export default slotRouter;

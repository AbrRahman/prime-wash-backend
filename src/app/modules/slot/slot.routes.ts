import express from "express";
import slotController from "./slot.controller";

const router = express.Router();

router.post("/", slotController.createSlot);

const slotRouter = router;
export default slotRouter;

import express from "express";
import validationRequest from "../../middleware/validationRequest";
import userValidation from "./user.validation";
import userController from "./user.controller";
import { upload } from "../../utils/handleImageUpload";
const router = express.Router();

// create user
router.post(
  "/",
  upload.single("file"),
  validationRequest(userValidation.createUserValidationSchema),
  userController.createUser
);
// retrieve all users
router.get("/", userController.getAllUser);

const userRouter = router;
export default userRouter;

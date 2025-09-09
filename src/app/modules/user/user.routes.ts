import express from "express";
import validationRequest from "../../middleware/validationRequest";
import userValidation from "./user.validation";
import userController from "./user.controller";
import { upload } from "../../utils/handleImageUpload";
import auth from "../../middleware/auth";
const router = express.Router();

// create user
router.post(
  "/",
  upload.single("file"),
  validationRequest(userValidation.createUserValidationSchema),
  userController.createUser
);
// retrieve all users
router.get("/", auth("admin"), userController.getAllUser);

// get single user
router.get("/:id", auth("admin", "user"), userController.getSingleUser);
// update  users
router.put("/:id", auth("admin", "user"), userController.updateUser);
// delete  users
router.delete("/:id", auth("admin"), userController.deleteUser);

const userRouter = router;
export default userRouter;

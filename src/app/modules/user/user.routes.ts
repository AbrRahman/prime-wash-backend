import express from "express";
import validationRequest from "../../middleware/validationRequest";
import userValidation from "./user.validation";
import userController from "./user.controller";
const router = express.Router();

// create user
router.post(
  "/",
  validationRequest(userValidation.createUserValidationSchema),
  userController.createUser
);
// retrieve all users
router.get("/", userController.getAllUser);

const userRouter = router;
export default userRouter;

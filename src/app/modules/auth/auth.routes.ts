import express from "express";
import authController from "./auth.controller";
import auth from "../../middleware/auth";
import { upload } from "../../utils/handleImageUpload";

const router = express.Router();

// login
router.post("/login", authController.loginUser);

// handel google login data
router.post("/google-login", authController.googleLogin);

//get refresh token to access token
router.post("/refresh-token", authController.refreshTokenToAccessToken);

// get user profile
router.get("/profile", auth("user", "admin"), authController.getUserProfile);

// update profile
router.patch(
  "/profile",
  auth("user", "admin"),
  upload.single("file"),
  authController.updateProfile
);

const authRouter = router;

export default authRouter;

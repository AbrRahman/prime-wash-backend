import express from "express";
import authController from "./auth.service";
const router = express.Router();

// login
router.post("/login", authController.loginUser);

//get refresh token to access token
router.post("/refresh-token", authController.refreshToken);

const authRouter = router;

export default authRouter;

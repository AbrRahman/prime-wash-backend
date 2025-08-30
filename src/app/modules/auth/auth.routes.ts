import express from "express";
import authController from "./auth.controller";

const router = express.Router();

// login
router.post("/login", authController.loginUser);

//get refresh token to access token
router.post("/refresh-token", authController.refreshTokenToAccessToken);

const authRouter = router;

export default authRouter;

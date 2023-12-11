import express from "express";
import { handleLogin } from "../controllers/userControllers/loginController";

const router = express.Router();

router.post("/login", handleLogin);

export default router;

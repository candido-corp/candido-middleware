import express from "express";

import { EnumRoutes } from "../models/enums/EnumRoutes";

import { controllerLogin } from "../controllers/auth/controllerLogin";
import { controllerRegister } from "../controllers/auth/controllerRegister";
import { controllerLogout } from "../controllers/auth/controllerLogout";
import { controllerRefreshToken } from "../controllers/auth/controllerRefreshToken";

const router = express.Router();

router.post(EnumRoutes.LOGIN, controllerLogin);
router.post(EnumRoutes.REGISTER, controllerRegister);
router.get(EnumRoutes.LOGOUT, controllerLogout);
router.post(EnumRoutes.REFRESH_TOKEN, controllerRefreshToken);

export default router;

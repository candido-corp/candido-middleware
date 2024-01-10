import express from "express";

import { EnumRoutes } from "../models/enums/EnumRoutes";

import { controllerLogin } from "../controllers/auth/controllerLogin";
import { controllerRegister } from "../controllers/auth/controllerRegister";
import { controllerLogout } from "../controllers/auth/controllerLogout";
import { controllerRegisterVerify } from "../controllers/auth/controllerRegisterVerify";

const router = express.Router();

router.post(EnumRoutes.LOGIN, controllerLogin);
router.post(EnumRoutes.REGISTER, controllerRegister);
router.get(EnumRoutes.REGISTER_VERIFY, controllerRegisterVerify);
router.get(EnumRoutes.LOGOUT, controllerLogout);

export default router;

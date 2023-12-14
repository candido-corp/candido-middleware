import express from "express";

import { EnumRoutes } from "../models/enums/EnumRoutes";

import { controllerLogin } from "../controllers/auth/controllerLogin";
import { controllerRegister } from "../controllers/auth/controllerRegister";
import { controllerLogout } from "../controllers/auth/controllerLogout";

const router = express.Router();

router.use(EnumRoutes.LOGIN, controllerLogin);
router.use(EnumRoutes.REGISTER, controllerRegister);
router.use(EnumRoutes.LOGOUT, controllerLogout);

export default router;

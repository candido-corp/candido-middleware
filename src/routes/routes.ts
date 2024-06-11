import express from "express";

import { EnumRoutes } from "../models/enums/EnumRoutes";

import { controllerLogin } from "../controllers/controllerLogin";
import { controllerRegisterEmailVerification } from "../controllers/controllerRegisterEmailVerification";
import { controllerLogout } from "../controllers/controllerLogout";
import { controllerRegisterVerifyByEmail } from "../controllers/controllerRegisterVerifyByEmail";
import { controllerAccount } from "../controllers/controllerAccount";
import {controllerRegisterCodeVerification} from "../controllers/controllerRegisterCodeVerification";
import {controllerRegisterVerifyByCode} from "../controllers/controllerRegisterVerifyByCode";

const router = express.Router();

router.post(EnumRoutes.LOGIN, controllerLogin);
router.post(EnumRoutes.REGISTER_EMAIL, controllerRegisterEmailVerification);
router.get(EnumRoutes.REGISTER_EMAIL_VERIFY, controllerRegisterVerifyByEmail);
router.post(EnumRoutes.REGISTER_CODE, controllerRegisterCodeVerification);
router.get(EnumRoutes.REGISTER_CODE_VERIFY, controllerRegisterVerifyByCode);
router.get(EnumRoutes.LOGOUT, controllerLogout);

router.get(EnumRoutes.ACCOUNT, controllerAccount);

export default router;

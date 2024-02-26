import express from "express";

import { EnumRoutes } from "../models/enums/EnumRoutes";

import { controllerLogin } from "../controllers/auth/controllerLogin";
import { controllerRegisterEmailVerification } from "../controllers/auth/controllerRegisterEmailVerification";
import { controllerLogout } from "../controllers/auth/controllerLogout";
import { controllerRegisterVerifyByEmail } from "../controllers/auth/controllerRegisterVerifyByEmail";
import { controllerAccount } from "../controllers/account/controllerAccount";
import {controllerRegisterCodeVerification} from "../controllers/auth/controllerRegisterCodeVerification";
import {controllerRegisterVerifyByCode} from "../controllers/auth/controllerRegisterVerifyByCode";

const router = express.Router();

router.post(EnumRoutes.LOGIN, controllerLogin);
router.post(EnumRoutes.REGISTER_EMAIL_VERIFICATION, controllerRegisterEmailVerification);
router.get(EnumRoutes.REGISTER_VERIFY_BY_EMAIL, controllerRegisterVerifyByEmail);
router.post(EnumRoutes.REGISTER_CODE_VERIFICATION, controllerRegisterCodeVerification);
router.get(EnumRoutes.REGISTER_VERIFY_BY_CODE, controllerRegisterVerifyByCode);
router.get(EnumRoutes.LOGOUT, controllerLogout);

router.get(EnumRoutes.ACCOUNT, controllerAccount);

export default router;

import express from "express";

import {controllerLoginV1} from "./controllers/v1/controllerLoginV1";
import {controllerRegisterEmailV1} from "./controllers/v1/controllerRegisterEmailV1";
import {controllerLogoutV1} from "./controllers/v1/controllerLogoutV1";
import {controllerRegisterEmailVerifyV1} from "./controllers/v1/controllerRegisterEmailVerifyV1";
import {controllerAccountV1} from "./controllers/v1/controllerAccountV1";
import {controllerRegisterCodeV1} from "./controllers/v1/controllerRegisterCodeV1";
import {controllerRegisterCodeVerifyV1} from "./controllers/v1/controllerRegisterCodeVerifyV1";
import {controllerRegisterCodeResendV1} from "./controllers/v1/controllerRegisterCodeResendV1";
import {controllerAccountDetailV1} from "./controllers/v1/controllerAccountDetailV1";
import {controllerResetPasswordSendV1} from "./controllers/v1/controllerResetPasswordSendV1";

const router = express.Router();

router.post("/api/v1/auth/login", controllerLoginV1);
router.post("/api/v1/auth/logout", controllerLogoutV1);

router.post("/api/v1/auth/register/email", controllerRegisterEmailV1);
router.post("/api/v1/auth/register/email/verify", controllerRegisterEmailVerifyV1);

router.post("/api/v1/auth/register/code", controllerRegisterCodeV1);
router.post("/api/v1/auth/register/code/resend", controllerRegisterCodeResendV1);
router.post("/api/v1/auth/register/code/verify", controllerRegisterCodeVerifyV1);

router.post("/api/v1/auth/reset-password/send", controllerResetPasswordSendV1);
router.post("/api/v1/auth/reset-password/change-password", () => {});
router.post("/api/v1/auth/reset-password/check-validity", () => {});

router.get("/api/v1/me", controllerAccountV1);
router.get("/api/v1/me/details", controllerAccountDetailV1);

export default router;

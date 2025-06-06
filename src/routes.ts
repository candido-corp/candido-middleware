import { EnumControllerName } from "./data/enums/EnumControllerName";
import { EnumControllerType } from "./data/enums/EnumControllerType";
import { RouteConfigInterface } from "./data/utils/RouteConfigInterface";

const routes: RouteConfigInterface[] = [
  {
    access: EnumControllerType.PUBLIC,
    method: "post",
    path: "/api/v1/auth/login",
    controller: EnumControllerName.controllerLogin,
  },
  {
    access: EnumControllerType.PUBLIC,
    method: "post",
    path: "/api/v1/auth/logout",
    controller: EnumControllerName.controllerLogout,
  },
  {
    access: EnumControllerType.PUBLIC,
    method: "post",
    path: "/api/v1/auth/token/refresh",
    controller: EnumControllerName.controllerRefreshToken,
  },
  {
    access: EnumControllerType.PUBLIC,
    method: "post",
    path: "/api/v1/auth/register",
    controller: EnumControllerName.controllerRegister,
  },
  {
    access: EnumControllerType.PUBLIC,
    method: "post",
    path: "/api/v1/auth/register/verify",
    controller: EnumControllerName.controllerRegisterVerify,
  },
  {
    access: EnumControllerType.PROTECTED,
    method: "post",
    path: "/api/v1/auth/register/email/resend",
    controller: EnumControllerName.controllerRegisterEmailResend,
  },
  {
    access: EnumControllerType.PUBLIC,
    method: "post",
    path: "/api/v1/auth/register/code/resend",
    controller: EnumControllerName.controllerRegisterCodeResend,
  },
  {
    access: EnumControllerType.PUBLIC,
    method: "post",
    path: "/api/v1/auth/reset-password/send",
    controller: EnumControllerName.controllerResetPasswordSend,
  },
  {
    access: EnumControllerType.PUBLIC,
    method: "post",
    path: "/api/v1/auth/reset-password/change-password",
    controller: EnumControllerName.controllerResetPasswordChangePassword,
  },
  {
    access: EnumControllerType.PUBLIC,
    method: "get",
    path: "/api/v1/auth/reset-password/check-validity",
    controller: EnumControllerName.controllerResetPasswordCheckValidity,
  },
  {
    access: EnumControllerType.PROTECTED,
    method: "get",
    path: "/api/v1/genders",
    controller: EnumControllerName.controllerGender,
  },
  {
    access: EnumControllerType.PROTECTED,
    method: "get",
    path: "/api/v1/me",
    controller: EnumControllerName.controllerAccount,
  },
  {
    access: EnumControllerType.PROTECTED,
    method: "get",
    path: "/api/v1/me/details",
    controller: EnumControllerName.controllerAccountDetail,
  },
  {
    access: EnumControllerType.PROTECTED,
    method: "put",
    path: "/api/v1/me/details",
    controller: EnumControllerName.controllerAccountChangeDetail,
  },
  {
    access: EnumControllerType.PROTECTED,
    method: "get",
    path: "/api/v1/me/details/addresses",
    controller: EnumControllerName.controllerAccountAddresses,
  },
  {
    access: EnumControllerType.PROTECTED,
    method: "post",
    path: "/api/v1/me/details/addresses",
    controller: EnumControllerName.controllerAccountAddressesAdd,
  },
  {
    access: EnumControllerType.PROTECTED,
    method: "put",
    path: "/api/v1/me/details/addresses/:addressId",
    controller: EnumControllerName.controllerAccountAddressChange,
  },
  {
    access: EnumControllerType.PROTECTED,
    method: "delete",
    path: "/api/v1/me/details/addresses/:addressId",
    controller: EnumControllerName.controllerAccountAddressDelete,
  },
  {
    access: EnumControllerType.PROTECTED,
    method: "get",
    path: "/api/v1/geos",
    controller: EnumControllerName.controllerGeos,
  },
  {
    access: EnumControllerType.PROTECTED,
    method: "get",
    path: "/api/v1/geos/:geoId/children",
    controller: EnumControllerName.controllerGeosChildren,
  },
  {
    access: EnumControllerType.PROTECTED,
    method: "get",
    path: "/api/v1/geos/address-types",
    controller: EnumControllerName.controllerGeosAddressTypes,
  },
  {
    access: EnumControllerType.PROTECTED,
    method: "put",
    path: "/api/v1/me/password",
    controller: EnumControllerName.controllerAccountPassword,
  },
  {
    access: EnumControllerType.PROTECTED,
    method: "get",
    path: "/api/v1/me/applications",
    controller: EnumControllerName.controllerApplications,
  },
];

export default routes;

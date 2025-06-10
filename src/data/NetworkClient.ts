import { GET, POST, PUT, DELETE } from "./NetworkCallDecorator";
import { EnumServerRoutes } from "./enums/EnumServerRoutes";
import { ResponseLoginData } from "./responses/ResponseLoginData";
import { RequestLogin } from "./requests/RequestLogin";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { RequestRegister } from "./requests/RequestRegister";
import { RequestRegisterVerify } from "./requests/RequestRegisterVerify";
import { RequestRegisterCodeResend } from "./requests/RequestRegisterCodeResend";
import { ResponseRegisterCode } from "./responses/ResponseRegisterCode";
import { RequestResetPasswordSend } from "./requests/RequestResetPasswordSend";
import { RequestResetPasswordChangePassword } from "./requests/RequestResetPasswordChangePassword";
import { RequestResetPasswordCheckValidity } from "./requests/RequestResetPasswordCheckValidity";
import { RequestAccountChangePassword } from "./requests/RequestAccountChangePassword";
import { RequestPathGeosChildren } from "./requests/RequestPathGeosChildren";
import { RequestAccountChangeDetails } from "./requests/RequestAccountChangeDetails";
import { RequestAccountDetailsAddress } from "./requests/RequestAccountDetailsAddress";
import { RequestAccountSettings } from "./requests/RequestAccountSettings";

class NetworkClient {
  @POST(EnumServerRoutes.LOGIN)
  async login(options: { data: RequestLogin }): Promise<AxiosResponse<ResponseLoginData>> {
    return {} as AxiosResponse<ResponseLoginData>;
  }

  @POST(EnumServerRoutes.LOGOUT)
  async logout(): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.REFRESH_TOKEN)
  async refreshToken(options: { axiosConfig?: AxiosRequestConfig }): Promise<AxiosResponse<ResponseLoginData>> {
    return {} as AxiosResponse<ResponseLoginData>;
  }

  @POST(EnumServerRoutes.REGISTER_EMAIL)
  async registerEmail(options: { data: RequestRegister }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.REGISTER_EMAIL_VERIFY)
  async registerEmailVerify(options: { data: RequestRegisterVerify }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.REGISTER_CODE)
  async registerCode(options: { data: RequestRegister }): Promise<AxiosResponse<ResponseRegisterCode>> {
    return {} as AxiosResponse<ResponseRegisterCode>;
  }

  @POST(EnumServerRoutes.REGISTER_EMAIL_RESEND)
  async registerEmailResend(options: { data: RequestRegisterCodeResend }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.REGISTER_CODE_RESEND)
  async registerCodeResend(options: { data: RequestRegisterCodeResend }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.REGISTER_CODE_VERIFY)
  async registerCodeVerify(options: { data: RequestRegisterVerify }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.RESET_PASSWORD_SEND)
  async resetPasswordSend(options: { data: RequestResetPasswordSend }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @GET(EnumServerRoutes.RESET_PASSWORD_CHECK_VALIDITY)
  async resetPasswordCheckValidity(options: { params: RequestResetPasswordCheckValidity }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.RESET_PASSWORD_CHANGE_PASSWORD)
  async resetPasswordChangePassword(options: { data: RequestResetPasswordChangePassword }): Promise<AxiosResponse<ResponseLoginData>> {
    return {} as AxiosResponse<ResponseLoginData>;
  }

  @GET(EnumServerRoutes.ACCOUNT)
  async getAccount(options: { axiosConfig?: AxiosRequestConfig }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @GET(EnumServerRoutes.ACCOUNT_DETAILS)
  async getAccountDetails(options: { axiosConfig?: AxiosRequestConfig }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @PUT(EnumServerRoutes.ACCOUNT_DETAILS)
  async changeAccountDetails(options: { axiosConfig?: AxiosRequestConfig; data: RequestAccountChangeDetails }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @GET(EnumServerRoutes.ACCOUNT_DETAILS_ADDRESSES)
  async getAccountDetailsAddresses(options: { axiosConfig?: AxiosRequestConfig }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.ACCOUNT_DETAILS_ADDRESSES)
  async addAccountDetailsAddress(options: { axiosConfig?: AxiosRequestConfig; data: RequestAccountDetailsAddress }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @PUT(EnumServerRoutes.ACCOUNT_DETAILS_ADDRESS)
  async changeAccountDetailsAddress(options: { axiosConfig?: AxiosRequestConfig; data: RequestAccountDetailsAddress }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @DELETE(EnumServerRoutes.ACCOUNT_DETAILS_ADDRESS)
  async deleteAccountDetailsAddress(options: { axiosConfig?: AxiosRequestConfig }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @PUT(EnumServerRoutes.ACCOUNT_PASSWORD)
  async changeAccountPassword(options: { axiosConfig?: AxiosRequestConfig; data: RequestAccountChangePassword }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @GET(EnumServerRoutes.GENDERS)
  async getGenders(options: { axiosConfig?: AxiosRequestConfig }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @GET(EnumServerRoutes.GEOS)
  async getCountries(options: { axiosConfig?: AxiosRequestConfig }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @GET(EnumServerRoutes.GEOS_CHILDREN)
  async getCountriesChildren(options: { axiosConfig?: AxiosRequestConfig; pathParams: RequestPathGeosChildren }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @GET(EnumServerRoutes.GEOS_ADDRESS_TYPES)
  async getAddressTypes(options: { axiosConfig?: AxiosRequestConfig }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @PUT(EnumServerRoutes.ACCOUNT_SETTINGS)
  async changeAccountSettings(options: { axiosConfig?: AxiosRequestConfig; data: RequestAccountSettings }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @GET(EnumServerRoutes.APPLICATIONS)
  async getApplications(options: { axiosConfig?: AxiosRequestConfig; pathParams: RequestPathGeosChildren }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }
}

export default new NetworkClient();

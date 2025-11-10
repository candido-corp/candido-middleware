export enum RequestRegisterVerifyType {
	EMAIL = "email",
	CODE = "code",
}

export type RequestRegisterVerify = {
	t: string;
	e: string;
	a: RequestRegisterVerifyType;
	c?: string;
};
export enum RequestRegisterType {
	EMAIL = "email",
	CODE = "code",
}

export type RequestRegister = {
	email?: string;
	password?: string;
	confirm_password?: string;
	first_name?: string;
	last_name?: string;
	a: string;
}
